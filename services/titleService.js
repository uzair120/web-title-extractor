const { formatUrl } = require("../utils/utils.js");
const { fetchTitleWithCallback } = require("../helper/fetchTitleHelpers.js");

// Fetch titles
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
