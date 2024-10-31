import { HTTPRequestClient } from "../types/HTTPRequestClient";
import { Response } from "../types/Response";

export default class RESTClient implements HTTPRequestClient {
  responseType = Response.json;
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // must use unknown as the shape of the reponse as the body is unknown
  async get(url: string): Promise<unknown> {
    const response = await fetch(`${this.baseUrl}/${url}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  }
}
