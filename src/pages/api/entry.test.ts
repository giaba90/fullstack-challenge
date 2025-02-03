import { NextApiRequest, NextApiResponse } from "next";
import { getEntries } from "../../pages/api/entry";
import handler, { createEntry } from "../../pages/api/entry";
import { createRequest, createResponse } from "node-mocks-http";

describe("API: /api/entry", () => {
  let mockReq: Partial<NextApiRequest>;
  let mockRes: Partial<NextApiResponse>;

  beforeEach(() => {
    mockReq = {};
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  jest.mock("../../pages/api/entry", () => ({
    __esModule: true,
    createEntry: jest.fn(),
    default: jest.fn(),
  }));

  it("should return appropriate error for malformed GET requests", async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: "GET",
      headers: {},
    };
    const mockRes: Partial<NextApiResponse> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest
      .spyOn(require("../../app/lib/helper"), "validateApiKey")
      .mockReturnValue({ success: false, error: "Invalid API key" });

    await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({ error: "Invalid API key" });
  });
});
