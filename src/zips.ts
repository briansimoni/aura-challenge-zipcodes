import { HttpRequestEvent } from "./types/event";
import { Zips } from "./resources/zipcode";

/**
 * Since Zips is loading a large json file from disk,
 * we can get a small optimization by loading it
 * outside of the handler invocation
 */
const zips = new Zips();

export async function handler(event: HttpRequestEvent) {
  try {
    switch (event.httpMethod.toUpperCase()) {
      case "GET":
        return zips.get(event);
      case "POST":
        return zips.post(event);
      default:
        return {
          statusCode: 404,
        };
    }
  } catch (err) {
    console.log(JSON.stringify(err));
    return {
      statusCode: 500,
      body: err,
      headers: {
        "Content-Type": "text/plain",
      },
    };
  }
}
