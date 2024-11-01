import RESTClient from "../src/clients/rest";
import BookSearchApiClient from "../src/BookSearchApiClient";
import books from "../__fixtures__/books.json";
import booksByAuthorResponse from "../__fixtures__/booksByAuthorResponse.json";

describe("BookSearchApiClient", () => {
  test("should ", async () => {
    const mockFetch = jest.fn().mockImplementationOnce(() => {
      return {
        ok: true,
        json: () => {
          return books;
        },
      };
    });
    global.fetch = mockFetch;

    const restClient = new RESTClient("http://test-url.com");

    const bookSearchApiClient = new BookSearchApiClient(restClient);
    const result = await bookSearchApiClient.getBooksByAuthor(
      "shakespeare",
      10
    );
    expect(result).toEqual(booksByAuthorResponse);
    expect(mockFetch).toHaveBeenCalledWith(
      "http://test-url.com/by-author?q=shakespeare&limit=10&format=json"
    );
  });
});
