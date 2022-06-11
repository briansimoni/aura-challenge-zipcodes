import { HttpRequestEvent } from "./types/event";
import { ZipCode } from "./zipcode";

// could theoretically be used across invocations
// this improves efficiency by a small margin
const zips = new ZipCode();

export async function handler(event: HttpRequestEvent) {
  try {

      switch (event.httpMethod.toUpperCase()) {
        case "GET":
          return zips.get(event);
        case "POST":
          return zips.post(event);
        default:
          return {
            statusCode: 404
          };
      }

  } catch (err) {
    console.log(JSON.stringify(err))
    return {
      statusCode: 500,
      body: err,
      headers: {
        "Content-Type": "text/plain",
      },
    };
  }
}
