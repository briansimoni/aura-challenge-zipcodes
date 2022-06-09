import * as zipcodes from "./data.json";
import { HttpRequestEvent } from "./types/event";
import { ZipCode } from "./zipcode";
import * as fs from "fs";
import { dirname, join } from "path";

// could theoretically be used across invocations
// this improves efficiency by a small margin
const zips = new ZipCode();

export async function handler(event: HttpRequestEvent) {
  try {
    console.log(event.path, event.httpMethod);
    const notFound = {
      statusCode: 404,
      body: JSON.stringify({
        statusCode: 404,
        error: `${event.httpMethod} ${event.path} not found`,
      }),
    };

    const path = event.path.substring(1);
    const method = event.httpMethod;

    if (path === "docs.yml") {
      const docs = fs.readFileSync("./docs.yml");
      return {
        statusCode: 200,
        body: String(docs).replace(
          "{{url}}",
          "https://5k41mmumcj.execute-api.us-east-1.amazonaws.com/"
        ),
        headers: {
          "Content-Type": "text/plain",
        },
      };
    }

    if (path === "docs") {
      const docs = fs.readFileSync(join(__dirname, "docs.html"));
      return {
        statusCode: 200,
        body: String(docs),
        headers: {
          "Content-Type": "text/html",
        },
      };
    }

    if (path === "zips") {
      switch (method.toUpperCase()) {
        case "GET":
          return zips.get(event);
        case "POST":
          return zips.post(event);
        default:
          return notFound;
      }
    }

    return notFound

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err),
      headers: {
        "Content-Type": "text/plain",
      },
    };
  }
}
