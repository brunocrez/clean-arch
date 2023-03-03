export enum HttpStatusCode {
  SUCCESS = 200,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  SERVER_ERROR = 500
}

export type HttpResponse = {
  statusCode: HttpStatusCode
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any
}
