const http = require("http");
const https = require("https");
const rsvp = require("rsvp");
// Helper function using callbacks
const fetchTitleWithCallback = (address, callback) => {
  const client = address.startsWith("https") ? https : http;

  client
    .get(address, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        const match = data.match(/<title>(.*?)<\/title>/);
        const title = match ? match[1] : "NO RESPONSE";
        callback(null, { address, title });
      });
    })
    .on("error", () => {
      callback(null, { address, title: "NO RESPONSE" });
    });
};

// Helper function using promises
const fetchTitleWithPromise = (address) => {
  return new Promise((resolve) => {
    const client = address.startsWith("https") ? https : http;

    client
      .get(address, (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          const match = data.match(/<title>(.*?)<\/title>/);
          const title = match ? match[1] : "NO RESPONSE";
          resolve({ address, title });
        });
      })
      .on("error", () => {
        resolve({ address, title: "NO RESPONSE" });
      });
  });
};

// Helper function using RSVP promises
const fetchTitleWithRSVP = (address) => {
  return new rsvp.Promise((resolve) => {
    const client = address.startsWith("https") ? https : http;

    client
      .get(address, (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          const match = data.match(/<title>(.*?)<\/title>/);
          const title = match ? match[1] : "NO RESPONSE";
          resolve({ address, title });
        });
      })
      .on("error", () => {
        resolve({ address, title: "NO RESPONSE" });
      });
  });
};

// Exporting all the helper functions
module.exports = {
  fetchTitleWithCallback,
  fetchTitleWithPromise,
  fetchTitleWithRSVP
};
