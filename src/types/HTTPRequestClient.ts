export interface HTTPRequestClient {
  // returns any as the reponse body is unknown
  get(url: string): Promise<any>;
}
