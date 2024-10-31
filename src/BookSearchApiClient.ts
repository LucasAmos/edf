import { Book } from "./types/Book";
import { BookApiClient } from "./types/BookApiClient";
import { HTTPRequestClient } from "./types/HTTPRequestClient";
import { Response } from "./types/Response";

type RestAPIResponse = {
  book: {
    title: string;
    author: string;
    isbn: number;
  };
  stock: {
    quantity: number;
    price: string;
  };
};

type XMLAPIResponse = {
  root: {
    row: {
      book: [{ title: [string]; author: [string]; isbn: [number] }];
      stock: [{ quantity: [number]; price: [string] }];
    }[];
  };
};

function assertNever(type: never): never {
  throw new Error(`Unsupported response type: ${type}`);
}

export default class BookSearchApiClient implements BookApiClient {
  client;
  constructor(client: HTTPRequestClient) {
    this.client = client;
  }

  formatResponse(responseType: Response, response: unknown): Book[] {
    if (responseType === Response.json) {
      return (response as RestAPIResponse[]).map((item) => {
        return {
          title: item.book.title,
          author: item.book.author,
          isbn: item.book.isbn,
          quantity: item.stock.quantity,
          price: item.stock.price,
        };
      });
    } else if (responseType === Response.xml) {
      return (response as XMLAPIResponse).root.row.map((item) => {
        return {
          title: item.book[0].title[0],
          author: item.book[0].author[0],
          isbn: item.book[0].isbn[0],
          quantity: item.stock[0].quantity[0],
          price: item.stock[0].price[0],
        };
      });
    }
    return assertNever(responseType);
  }

  async getBooksByAuthor(authorName: string, limit: number): Promise<Book[]> {
    const format = Response[this.client.responseType];
    const response = await this.client.get(
      `${this.client.baseUrl}/by-author?q=${authorName}&limit=${limit}&format=${format}`
    );

    return this.formatResponse(this.client.responseType, response);
  }

  async getBooksByPublisher(
    publisherName: string,
    limit: number
  ): Promise<Book[]> {
    const format = Response[this.client.responseType];

    const response = await this.client.get(
      `${this.client.baseUrl}/by-publisher?q=${publisherName}&limit=${limit}&format=${format}`
    );
    return this.formatResponse(this.client.responseType, response);
  }
}
