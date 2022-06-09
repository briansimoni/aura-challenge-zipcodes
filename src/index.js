"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const zipcode_1 = require("./zipcode");
const fs = require("fs");
const path_1 = require("path");
// could theoretically be used across invocations
// this improves efficiency by a small margin
const zips = new zipcode_1.ZipCode();
async function handler(event) {
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
                body: String(docs).replace("{{url}}", "https://5k41mmumcj.execute-api.us-east-1.amazonaws.com/"),
                headers: {
                    "Content-Type": "text/plain",
                },
            };
        }
        if (path === "docs") {
            const docs = fs.readFileSync(path_1.join(__dirname, "docs.html"));
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
        return notFound;
    }
    catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify(err),
            headers: {
                "Content-Type": "text/plain",
            },
        };
    }
}
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSx1Q0FBb0M7QUFDcEMseUJBQXlCO0FBQ3pCLCtCQUFxQztBQUVyQyxpREFBaUQ7QUFDakQsNkNBQTZDO0FBQzdDLE1BQU0sSUFBSSxHQUFHLElBQUksaUJBQU8sRUFBRSxDQUFDO0FBRXBCLEtBQUssVUFBVSxPQUFPLENBQUMsS0FBdUI7SUFDbkQsSUFBSTtRQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDMUMsTUFBTSxRQUFRLEdBQUc7WUFDZixVQUFVLEVBQUUsR0FBRztZQUNmLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDO2dCQUNuQixVQUFVLEVBQUUsR0FBRztnQkFDZixLQUFLLEVBQUUsR0FBRyxLQUFLLENBQUMsVUFBVSxJQUFJLEtBQUssQ0FBQyxJQUFJLFlBQVk7YUFDckQsQ0FBQztTQUNILENBQUM7UUFFRixNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQyxNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDO1FBRWhDLElBQUksSUFBSSxLQUFLLFVBQVUsRUFBRTtZQUN2QixNQUFNLElBQUksR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzNDLE9BQU87Z0JBQ0wsVUFBVSxFQUFFLEdBQUc7Z0JBQ2YsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQ3hCLFNBQVMsRUFDVCx5REFBeUQsQ0FDMUQ7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLGNBQWMsRUFBRSxZQUFZO2lCQUM3QjthQUNGLENBQUM7U0FDSDtRQUVELElBQUksSUFBSSxLQUFLLE1BQU0sRUFBRTtZQUNuQixNQUFNLElBQUksR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLFdBQUksQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUMzRCxPQUFPO2dCQUNMLFVBQVUsRUFBRSxHQUFHO2dCQUNmLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNsQixPQUFPLEVBQUU7b0JBQ1AsY0FBYyxFQUFFLFdBQVc7aUJBQzVCO2FBQ0YsQ0FBQztTQUNIO1FBRUQsSUFBSSxJQUFJLEtBQUssTUFBTSxFQUFFO1lBQ25CLFFBQVEsTUFBTSxDQUFDLFdBQVcsRUFBRSxFQUFFO2dCQUM1QixLQUFLLEtBQUs7b0JBQ1IsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN6QixLQUFLLE1BQU07b0JBQ1QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMxQjtvQkFDRSxPQUFPLFFBQVEsQ0FBQzthQUNuQjtTQUNGO1FBRUQsT0FBTyxRQUFRLENBQUE7S0FFaEI7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNaLE9BQU87WUFDTCxVQUFVLEVBQUUsR0FBRztZQUNmLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQztZQUN6QixPQUFPLEVBQUU7Z0JBQ1AsY0FBYyxFQUFFLFlBQVk7YUFDN0I7U0FDRixDQUFDO0tBQ0g7QUFDSCxDQUFDO0FBN0RELDBCQTZEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHppcGNvZGVzIGZyb20gXCIuL2RhdGEuanNvblwiO1xyXG5pbXBvcnQgeyBIdHRwUmVxdWVzdEV2ZW50IH0gZnJvbSBcIi4vdHlwZXMvZXZlbnRcIjtcclxuaW1wb3J0IHsgWmlwQ29kZSB9IGZyb20gXCIuL3ppcGNvZGVcIjtcclxuaW1wb3J0ICogYXMgZnMgZnJvbSBcImZzXCI7XHJcbmltcG9ydCB7IGRpcm5hbWUsIGpvaW4gfSBmcm9tIFwicGF0aFwiO1xyXG5cclxuLy8gY291bGQgdGhlb3JldGljYWxseSBiZSB1c2VkIGFjcm9zcyBpbnZvY2F0aW9uc1xyXG4vLyB0aGlzIGltcHJvdmVzIGVmZmljaWVuY3kgYnkgYSBzbWFsbCBtYXJnaW5cclxuY29uc3QgemlwcyA9IG5ldyBaaXBDb2RlKCk7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlcihldmVudDogSHR0cFJlcXVlc3RFdmVudCkge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zb2xlLmxvZyhldmVudC5wYXRoLCBldmVudC5odHRwTWV0aG9kKTtcclxuICAgIGNvbnN0IG5vdEZvdW5kID0ge1xyXG4gICAgICBzdGF0dXNDb2RlOiA0MDQsXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICBzdGF0dXNDb2RlOiA0MDQsXHJcbiAgICAgICAgZXJyb3I6IGAke2V2ZW50Lmh0dHBNZXRob2R9ICR7ZXZlbnQucGF0aH0gbm90IGZvdW5kYCxcclxuICAgICAgfSksXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHBhdGggPSBldmVudC5wYXRoLnN1YnN0cmluZygxKTtcclxuICAgIGNvbnN0IG1ldGhvZCA9IGV2ZW50Lmh0dHBNZXRob2Q7XHJcblxyXG4gICAgaWYgKHBhdGggPT09IFwiZG9jcy55bWxcIikge1xyXG4gICAgICBjb25zdCBkb2NzID0gZnMucmVhZEZpbGVTeW5jKFwiLi9kb2NzLnltbFwiKTtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXHJcbiAgICAgICAgYm9keTogU3RyaW5nKGRvY3MpLnJlcGxhY2UoXHJcbiAgICAgICAgICBcInt7dXJsfX1cIixcclxuICAgICAgICAgIFwiaHR0cHM6Ly81azQxbW11bWNqLmV4ZWN1dGUtYXBpLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tL1wiXHJcbiAgICAgICAgKSxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcInRleHQvcGxhaW5cIixcclxuICAgICAgICB9LFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChwYXRoID09PSBcImRvY3NcIikge1xyXG4gICAgICBjb25zdCBkb2NzID0gZnMucmVhZEZpbGVTeW5jKGpvaW4oX19kaXJuYW1lLCBcImRvY3MuaHRtbFwiKSk7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxyXG4gICAgICAgIGJvZHk6IFN0cmluZyhkb2NzKSxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcInRleHQvaHRtbFwiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHBhdGggPT09IFwiemlwc1wiKSB7XHJcbiAgICAgIHN3aXRjaCAobWV0aG9kLnRvVXBwZXJDYXNlKCkpIHtcclxuICAgICAgICBjYXNlIFwiR0VUXCI6XHJcbiAgICAgICAgICByZXR1cm4gemlwcy5nZXQoZXZlbnQpO1xyXG4gICAgICAgIGNhc2UgXCJQT1NUXCI6XHJcbiAgICAgICAgICByZXR1cm4gemlwcy5wb3N0KGV2ZW50KTtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgcmV0dXJuIG5vdEZvdW5kO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5vdEZvdW5kXHJcblxyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc3RhdHVzQ29kZTogNTAwLFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShlcnIpLFxyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJ0ZXh0L3BsYWluXCIsXHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=