const async = require("async");
const rsvp = require("rsvp");
const { formatUrl } = require("../utils/utils.js");
const {
  fetchTitleWithCallback,
  fetchTitleWithPromise,
  fetchTitleWithRSVP
} = require("../helper/fetchTitleHelpers.js");

// Fetch titles using plain callbacks
exports.fetchTitlesUsingCallbacks = (addresses, callback) => {
  if (!Array.isArray(addresses)) addresses = [addresses];
  let results = [];
  let completedRequests = 0;

  addresses.forEach((address) => {
    const formattedAddress = formatUrl(address);
    fetchTitleWithCallback(formattedAddress, (err, result) => {
      results.push(result);
      completedRequests++;

      if (completedRequests === addresses.length) {
        callback(null, results);
      }
    });
  });
};

// Fetch titles using async.js
exports.fetchTitlesUsingAsyncFlow = (addresses, callback) => {
  if (!Array.isArray(addresses)) addresses = [addresses];
  const formattedAddresses = addresses.map(formatUrl);

  async.map(formattedAddresses, fetchTitleWithCallback, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

// Fetch titles using promises
exports.fetchTitlesUsingPromises = (addresses) => {
  if (!Array.isArray(addresses)) addresses = [addresses];
  const formattedAddresses = addresses.map(formatUrl);

  return Promise.all(formattedAddresses.map(fetchTitleWithPromise));
};

// Fetch titles using RSVP promises
exports.fetchTitlesUsingRSVP = (addresses) => {
  if (!Array.isArray(addresses)) addresses = [addresses];
  const formattedAddresses = addresses.map(formatUrl);

  // Using RSVP's Promise.all
  return rsvp.Promise.all(formattedAddresses.map(fetchTitleWithRSVP));
};
