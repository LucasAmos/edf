import RESTClient from "../../src/clients/rest";

describe("REST client", () => {
  const client = new RESTClient("http://test-url.com");

  test("Makes fetch request and returns correct body", async () => {
    const mockFetch = jest.fn().mockImplementationOnce(() => {
      return {
        ok: true,
        json: () => {
          return {
            body: "text",
          };
        },
      };
    });
    global.fetch = mockFetch;

    const response = await client.get("path/1");

    expect(response).toEqual({ body: "text" });
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
