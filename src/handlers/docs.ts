import { HttpRequestEvent } from "../types/event";
import * as fs from "fs";
import { join } from "path";

export async function handler(event: HttpRequestEvent) {
      const docs = fs.readFileSync(join(__dirname, "../static/docs.html"));
      return {
        statusCode: 200,
        body: String(docs),
        headers: {
          "Content-Type": "text/html",
        },
      };
}
