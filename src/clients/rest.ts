import { HTTPRequestClient } from "../types";

export default class RESTClient implements HTTPRequestClient {
  async get(url: string): Promise<any> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // must use any as the shape of the reponse body is unknown
    const data: any = await response.json();
    return data;
  }
}
