const titleController = require("../controllers/titleController");
const titleService = require("../services/titleService");
const { renderHTMLResponse } = require("../templates/htmlTemplates");

jest.mock("../services/titleService");
jest.mock("../templates/htmlTemplates");

describe("Title Controller", () => {
  let mockRequest, mockResponse;

  beforeEach(() => {
    mockRequest = {
      query: {
        address: ["example.com", "test.com"]
      }
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getTitlesWithCallbacks", () => {
    it("should return titles successfully", () => {
      const mockResults = [
        { address: "example.com", title: "Example Title" },
        { address: "test.com", title: "Test Title" }
      ];
      const mockHTMLResponse = "<html><body>Test</body></html>";

      titleService.fetchTitlesUsingCallbacks.mockImplementation(
        (addresses, callback) => {
          callback(null, mockResults);
        }
      );

      renderHTMLResponse.mockReturnValue(mockHTMLResponse);

      titleController.getTitlesWithCallbacks(mockRequest, mockResponse);

      expect(titleService.fetchTitlesUsingCallbacks).toHaveBeenCalledWith(
        mockRequest.query.address,
        expect.any(Function)
      );
      expect(renderHTMLResponse).toHaveBeenCalledWith(mockResults);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.send).toHaveBeenCalledWith(mockHTMLResponse);
    });

    it("should handle error", () => {
      titleService.fetchTitlesUsingCallbacks.mockImplementation(
        (addresses, callback) => {
          callback(new Error("Error"), null);
        }
      );

      titleController.getTitlesWithCallbacks(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.send).toHaveBeenCalledWith("Internal Server Error");
    });
  });

  describe("getTitlesWithAsyncFlow", () => {
    it("should return titles successfully", () => {
      const mockResults = [
        { address: "example.com", title: "Example Title" },
        { address: "test.com", title: "Test Title" }
      ];
      const mockHTMLResponse = "<html><body>Test</body></html>";

      titleService.fetchTitlesUsingAsyncFlow.mockImplementation(
        (addresses, callback) => {
          callback(null, mockResults);
        }
      );

      renderHTMLResponse.mockReturnValue(mockHTMLResponse);

      titleController.getTitlesWithAsyncFlow(mockRequest, mockResponse);

      expect(titleService.fetchTitlesUsingAsyncFlow).toHaveBeenCalledWith(
        mockRequest.query.address,
        expect.any(Function)
      );
      expect(renderHTMLResponse).toHaveBeenCalledWith(mockResults);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.send).toHaveBeenCalledWith(mockHTMLResponse);
    });

    it("should handle error", () => {
      titleService.fetchTitlesUsingAsyncFlow.mockImplementation(
        (addresses, callback) => {
          callback(new Error("Error"), null);
        }
      );

      titleController.getTitlesWithAsyncFlow(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.send).toHaveBeenCalledWith("Internal Server Error");
    });
  });

  describe("getTitlesWithPromises", () => {
    it("should return titles successfully", async () => {
      const mockResults = [
        { address: "example.com", title: "Example Title" },
        { address: "test.com", title: "Test Title" }
      ];
      const mockHTMLResponse = "<html><body>Test</body></html>";

      titleService.fetchTitlesUsingPromises.mockResolvedValue(mockResults);
      renderHTMLResponse.mockReturnValue(mockHTMLResponse);

      await titleController.getTitlesWithPromises(mockRequest, mockResponse);

      expect(titleService.fetchTitlesUsingPromises).toHaveBeenCalledWith(
        mockRequest.query.address
      );
      expect(renderHTMLResponse).toHaveBeenCalledWith(mockResults);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.send).toHaveBeenCalledWith(mockHTMLResponse);
    });
  });

  describe("getTitlesWithRSVP", () => {
    it("should return titles successfully", async () => {
      const mockResults = [
        { address: "example.com", title: "Example Title" },
        { address: "test.com", title: "Test Title" }
      ];
      const mockHTMLResponse = "<html><body>Test</body></html>";

      titleService.fetchTitlesUsingRSVP.mockResolvedValue(mockResults);
      renderHTMLResponse.mockReturnValue(mockHTMLResponse);

      await titleController.getTitlesWithRSVP(mockRequest, mockResponse);

      expect(titleService.fetchTitlesUsingRSVP).toHaveBeenCalledWith(
        mockRequest.query.address
      );
      expect(renderHTMLResponse).toHaveBeenCalledWith(mockResults);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.send).toHaveBeenCalledWith(mockHTMLResponse);
    });
  });
});
