import {
  Headers,
  HttpRequestEvent,
  MultiValueHeaders,
  PathParameters,
  QueryStringParameters,
  RequestContext,
  StageVariables,
} from "../src/types/event";
import { handler } from "../src/zips";

class FakeEvent implements HttpRequestEvent {
  body: string;
  path: string;
  resource: string;
  httpMethod: string;
  isBase64Encoded: false;
  queryStringParameters: QueryStringParameters;
  pathParameters: PathParameters;
  stageVariables: StageVariables;
  headers: Headers;
  multiValueHeaders: MultiValueHeaders;
  requestContext: RequestContext;
}

test("single area code", async () => {
  const event = new FakeEvent();
  event.httpMethod = "GET";
  const response = await handler(event);
  expect(response.statusCode).toBe(200);
});
