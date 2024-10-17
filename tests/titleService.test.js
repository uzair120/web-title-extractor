const nock = require("nock");
const {
  fetchTitlesUsingCallbacks,
  fetchTitlesUsingAsyncFlow,
  fetchTitlesUsingPromises,
  fetchTitlesUsingRSVP
} = require("../services/titleService");
const { renderHTMLResponse } = require("../templates/htmlTemplates");

describe("Title Service Tests", () => {
  const mockAddresses = ["google.com", "http://yahoo.com"];

  const mockResponseGoogle = "<html><title>Google</title></html>";
  const mockResponseYahoo = "<html><title>Yahoo</title></html>";

  // Setup mock HTTP requests
  beforeEach(() => {
    nock("http://google.com").get("/").reply(200, mockResponseGoogle);
    nock("http://yahoo.com").get("/").reply(200, mockResponseYahoo);
  });

  afterEach(() => {
    nock.cleanAll(); // Clean up all mocks after each test
  });

  // Test for callbacks
  it("should fetch titles using callbacks", (done) => {
    fetchTitlesUsingCallbacks(mockAddresses, (err, results) => {
      expect(results).toEqual([
        { address: "http://google.com", title: "Google" },
        { address: "http://yahoo.com", title: "Yahoo" }
      ]);
      done();
    });
  });

  // Test for async.js
  it("should fetch titles using async.js", (done) => {
    fetchTitlesUsingAsyncFlow(mockAddresses, (err, results) => {
      expect(results).toEqual([
        { address: "http://google.com", title: "Google" },
        { address: "http://yahoo.com", title: "Yahoo" }
      ]);
      done();
    });
  });

  // Test for promises
  it("should fetch titles using promises", () => {
    return fetchTitlesUsingPromises(mockAddresses).then((results) => {
      expect(results).toEqual([
        { address: "http://google.com", title: "Google" },
        { address: "http://yahoo.com", title: "Yahoo" }
      ]);
    });
  });

  // Test for RSVP promises
  it("should fetch titles using RSVP promises", () => {
    return fetchTitlesUsingRSVP(mockAddresses).then((results) => {
      expect(results).toEqual([
        { address: "http://google.com", title: "Google" },
        { address: "http://yahoo.com", title: "Yahoo" }
      ]);
    });
  });

  // Error handling test
  it("should return NO RESPONSE if the address is invalid (for callbacks)", (done) => {
    nock("http://invalidurl.com").get("/").replyWithError("error");
    fetchTitlesUsingCallbacks(["invalidurl.com"], (err, results) => {
      expect(results).toEqual([
        { address: "http://invalidurl.com", title: "NO RESPONSE" }
      ]);
      done();
    });
  });

  // Error handling for async.js
  it("should return NO RESPONSE if the address is invalid (for async.js)", (done) => {
    nock("http://invalidurl.com").get("/").replyWithError("error");
    fetchTitlesUsingAsyncFlow(["invalidurl.com"], (err, results) => {
      expect(results).toEqual([
        { address: "http://invalidurl.com", title: "NO RESPONSE" }
      ]);
      done();
    });
  });

  // Error handling for promises
  it("should return NO RESPONSE if the address is invalid (for promises)", () => {
    nock("http://invalidurl.com").get("/").replyWithError("error");
    return fetchTitlesUsingPromises(["invalidurl.com"]).then((results) => {
      expect(results).toEqual([
        { address: "http://invalidurl.com", title: "NO RESPONSE" }
      ]);
    });
  });

  // Error handling for RSVP promises
  it("should return NO RESPONSE if the address is invalid (for RSVP promises)", () => {
    nock("http://invalidurl.com").get("/").replyWithError("error");
    return fetchTitlesUsingRSVP(["invalidurl.com"]).then((results) => {
      expect(results).toEqual([
        { address: "http://invalidurl.com", title: "NO RESPONSE" }
      ]);
    });
  });

  it("should return the correct HTML string for given results", () => {
    const mockResults = [
      { address: "google.com", title: "Google" },
      { address: "yahoo.com", title: "Yahoo" },
      { address: "invalid.com", title: "NO RESPONSE" }
    ];

    const expectedHTML = `
    <html>
    <head></head>
    <body>
    <ul>
    <h1>Following are the titles of given websites:</h1><li>google.com - "Google"</li><li>yahoo.com - "Yahoo"</li><li>invalid.com - "NO RESPONSE"</li></ul></body></html>`;

    const actualHTML = renderHTMLResponse(mockResults);

    expect(actualHTML).toBe(expectedHTML);
  });
});
