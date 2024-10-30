import { Book, BookApiClient, HTTPRequestClient } from "./types";
import RESTClient from "./clients/rest";

export default class BookSearchApiClient implements BookApiClient {
  baseUrl: string;
  client: HTTPRequestClient;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.client = new RESTClient();
  }
  async getBooksByAuthor(authorName: string, limit: number): Promise<Book[]> {
    const response = await this.client.get(
      `${this.baseUrl}/by-author?q=${authorName}&limit=${limit}&format=json`
    );

    const result = response.map((item) => {
      return {
        title: item.book.title,
        author: item.book.author,
        isbn: item.book.isbn,
        quantity: item.stock.quantity,
        price: item.stock.price,
      };
    });
    return result as Book[];
  }
}
