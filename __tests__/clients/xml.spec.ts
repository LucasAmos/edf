import XMLClient from "../../src/clients/xml";

describe("XML client", () => {
  const client = new XMLClient("http://test-url.com");

  test("Makes fetch request and returns XML parsed to JSON", async () => {
    const mockFetch = jest.fn().mockImplementationOnce(() => {
      return {
        ok: true,
        text: () => {
          return `<?xml version="1.0" encoding="UTF-8" ?>
                  <root>
                    <body>text</body>
                  </root>`;
        },
      };
    });
    global.fetch = mockFetch;

    const response = await client.get("path/1");

    expect(response).toEqual({ root: { body: ["text"] } });
    expect(mockFetch).toHaveBeenCalledWith("http://test-url.com/path/1");
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  test("Throws error", async () => {
    const mockFetch = jest.fn().mockImplementationOnce(() => {
      return {
        ok: false,
        status: 500,
      };
    });
    global.fetch = mockFetch;

    expect(async () => {
      await client.get("path/1");
    }).rejects.toThrow("HTTP error! Status: 500");
  });
});
