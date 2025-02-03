import { NextApiRequest, NextApiResponse } from "next";
import { getEntries } from "../../pages/api/entry";
import handler, { createEntry } from "../../pages/api/entry";

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

  it("should return appropriate error for invalid API keys", async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: "GET",
      headers: {
        "x-api-key": "invalid-key",
      },
    };
    const mockRes: Partial<NextApiResponse> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.mock("../../app/prisma/client", () => ({
      __esModule: true,
      default: {
        entry: {
          findMany: jest.fn(),
        },
        $disconnect: jest.fn(),
      },
    }));

    const mockPrisma = {
      entry: {
        findMany: jest.fn(),
      },
      $disconnect: jest.fn(),
    };
    //  jest.spyOn(require("../../app/prisma/client"), "default").mockImplementation(() => mockPrisma);
    await getEntries(mockReq as NextApiRequest, mockRes as NextApiResponse);
    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({ error: "Invalid API key" });
    expect(mockPrisma.entry.findMany).not.toHaveBeenCalled();
    expect(mockPrisma.$disconnect).not.toHaveBeenCalled();
  });

  it("should create a new entry when POST request is valid", async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: "POST",
      headers: { "x-api-key": "1234567890" },
      body: {
        applicationHostname: "test.com",
        type: "WEB",
        user: "testuser",
        country: "US",
        ip: "127.0.0.1",
        device: "desktop",
        isDangerous: false,
        tags: [{ title: "Test", description: "Test tag", color: "#000000" }],
      },
    };
    const mockRes: Partial<NextApiResponse> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest
      .spyOn(require("../../app/lib/helper"), "validateApiKey")
      .mockReturnValue({ success: true });
    /*
    const mockCreate = jest.fn().mockResolvedValue({ id: 1, ...mockReq.body });
    jest.spyOn(prisma.entry, "create").mockImplementation(mockCreate);*/

    await createEntry(mockReq as NextApiRequest, mockRes as NextApiResponse);

    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({ id: 1, ...mockReq.body })
    );
  });
});
