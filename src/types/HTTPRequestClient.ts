import { Response } from "./Response";

export interface HTTPRequestClient {
  baseUrl: string;
  responseType: Response;
  //unknown is used instead of any to ensure reponse payload must be narrowed
  get(url: string): Promise<unknown>;
}
