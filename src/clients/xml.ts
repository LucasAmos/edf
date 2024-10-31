import { HTTPRequestClient } from "../types/HTTPRequestClient";
import { Response } from "../types/Response";
import xml2js from "xml2js";

export default class implements HTTPRequestClient {
  responseType = Response.xml;
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // must return unknown as response format is unknown
  async get(url: string): Promise<unknown> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return xml2js.parseStringPromise(await response.text());
  }
}
