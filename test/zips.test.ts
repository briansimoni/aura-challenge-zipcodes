import {
  Headers,
  HttpRequestEvent,
  MultiValueHeaders,
  MultiValueQueryStringParameters,
  PathParameters,
  QueryStringParameters,
  RequestContext,
  StageVariables,
} from "../src/types/event";
import { Zip } from "../src/types/zip";
import { ZipCode } from "../src/zipcode";

class FakeEvent implements HttpRequestEvent {
  body: "";
  path: "";
  resource: "";
  httpMethod: "";
  isBase64Encoded: false;
  queryStringParameters: QueryStringParameters;
  multiValueQueryStringParameters: MultiValueQueryStringParameters;
  pathParameters: PathParameters;
  stageVariables: StageVariables;
  headers: Headers;
  multiValueHeaders: MultiValueHeaders;
  requestContext: RequestContext;
}

test("single area code", () => {
  const zip = new ZipCode();
  const event = new FakeEvent();
  event.queryStringParameters = {
    area_codes: "203",
  };
  const result: Array<Zip> = JSON.parse(zip.get(event).body);

  expect(result).toHaveLength(181);

  // insired from https://medium.com/@andrei.pfeiffer/jest-matching-objects-in-array-50fe2f4d6b98
  expect(result).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        area_codes: "203",
      }),
    ])
  );
});

test("different single area code", () => {
  const zip = new ZipCode();
  const event = new FakeEvent();
  event.queryStringParameters = {
    area_codes: "203",
  };
  const result: Array<Zip> = JSON.parse(zip.get(event).body);

  expect(result).toHaveLength(181);

  // insired from https://medium.com/@andrei.pfeiffer/jest-matching-objects-in-array-50fe2f4d6b98
  expect(result).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        area_codes: "203",
      }),
    ])
  );
});

test("single 803 area code", () => {
  const zip = new ZipCode();
  const event = new FakeEvent();
  event.queryStringParameters = {
    area_codes: "413",
  };
  const result: Array<Zip> = JSON.parse(zip.get(event).body);

  expect(result).toHaveLength(153);

  // insired from https://medium.com/@andrei.pfeiffer/jest-matching-objects-in-array-50fe2f4d6b98
  expect(result).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        area_codes: "413",
      }),
    ])
  );
});

test("primary_city", () => {
  const zip = new ZipCode();
  const event = new FakeEvent();
  event.queryStringParameters = {
    primary_city: "Seymour",
  };
  const result: Array<Zip> = JSON.parse(zip.get(event).body);

  expect(result).toHaveLength(1);

  // insired from https://medium.com/@andrei.pfeiffer/jest-matching-objects-in-array-50fe2f4d6b98
  expect(result).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        primary_city: "Seymour",
      }),
    ])
  );
});

test('kClosestZips', () => {
  const zip = new ZipCode()
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
