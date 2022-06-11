import {
  Headers,
  HttpRequestEvent,
  MultiValueHeaders,
  PathParameters,
  QueryStringParameters,
  RequestContext,
  StageVariables,
} from "../../src/types/event";
import { Zip } from "../../src/types/zip";
import { Zips } from "../../src/resources/zipcode";

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

test("single area code", () => {
  const zip = new Zips();
  const event = new FakeEvent();
  event.queryStringParameters = {
    area_codes: "203",
  };
  const result: Array<Zip> = JSON.parse(zip.get(event).body);

  expect(result).toHaveLength(181);

  expect(result).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        area_codes: "203",
      }),
    ])
  );
});

test("different single area code", () => {
  const zip = new Zips();
  const event = new FakeEvent();
  event.queryStringParameters = {
    area_codes: "203",
  };
  const result: Array<Zip> = JSON.parse(zip.get(event).body);

  expect(result).toHaveLength(181);

  expect(result).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        area_codes: "203",
      }),
    ])
  );
});

test("single 803 area code", () => {
  const zip = new Zips();
  const event = new FakeEvent();
  event.queryStringParameters = {
    area_codes: "413",
  };
  const result: Array<Zip> = JSON.parse(zip.get(event).body);

  expect(result).toHaveLength(153);

  expect(result).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        area_codes: "413",
      }),
    ])
  );
});

test("primary_city", () => {
  const zip = new Zips();
  const event = new FakeEvent();
  event.queryStringParameters = {
    primary_city: "Seymour",
  };
  const result: Array<Zip> = JSON.parse(zip.get(event).body);

  expect(result).toHaveLength(1);

  expect(result).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        primary_city: "Seymour",
      }),
    ])
  );
});

test('kClosestZips', () => {
  const zip = new Zips()
  const zips = [
    {
      latitude: 1,
      longitude: 1
    },
    {
      latitude: 999,
      longitude: 999
    }
  ]
  const result = zip.kClosestZips(zips, {latitude: 2, longitude: 2}, 1)

  expect(result).toHaveLength(1)
  const closest = result[0]
  expect(closest.latitude).toBe(1)
  expect(closest.longitude).toBe(1)
})
