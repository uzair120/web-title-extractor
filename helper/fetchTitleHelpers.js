const http = require("http");
const https = require("https");

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

// Exporting functions
module.exports = {
  fetchTitleWithCallback
};
