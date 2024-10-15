const titleService = require("../services/titleService.js");
const { renderHTMLResponse } = require("../templates/htmlTemplates.js");

exports.getTitlesWithCallbacks = (req, res) => {
  const addresses = req.query.address;
  titleService.fetchTitlesUsingCallbacks(addresses, (err, results) => {
    if (err) {
      res.status(500).send("Internal Server Error");
      return;
    }
    const htmlResponse = renderHTMLResponse(results);
    res.status(200).send(htmlResponse);
  });
};

exports.getTitlesWithAsyncFlow = (req, res) => {
  const addresses = req.query.address;
  titleService.fetchTitlesUsingAsyncFlow(addresses, (err, results) => {
    if (err) {
      res.status(500).send("Internal Server Error");
      return;
    }
    const htmlResponse = renderHTMLResponse(results);
    res.status(200).send(htmlResponse);
  });
};

exports.getTitlesWithPromises = (req, res) => {
  const addresses = req.query.address;
  titleService
    .fetchTitlesUsingPromises(addresses)
    .then((results) => {
      const htmlResponse = renderHTMLResponse(results);
      res.status(200).send(htmlResponse);
    })
    .catch(() => {
      res.status(500).send("Internal Server Error");
    });
};

exports.getTitlesWithRSVP = (req, res) => {
  const addresses = req.query.address;
  titleService
    .fetchTitlesUsingRSVP(addresses)
    .then((results) => {
      const htmlResponse = renderHTMLResponse(results);
      res.status(200).send(htmlResponse);
    })
    .catch(() => {
      res.status(500).send("Internal Server Error");
    });
};
