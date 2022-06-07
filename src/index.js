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
    console.log(event.path, event.httpMethod);
    const notFound = {
        statusCode: 404,
        body: JSON.stringify({
            statusCode: 404,
            error: `${event.httpMethod} ${event.path} not found`
        }),
    };
    const path = event.path.substring(1);
    const method = event.httpMethod;
    // return {
    //   statusCode: 200,
    //   body: JSON.stringify(event)
    // }
    if (path === 'debug') {
        return {
            statusCode: 200,
            body: 'hello'
        };
    }
    if (path === 'docs.yml') {
        try {
            const docs = fs.readFileSync('./docs.yml');
            return {
                statusCode: 200,
                body: String(docs).replace('{{url}}', 'https://5k41mmumcj.execute-api.us-east-1.amazonaws.com/'),
                headers: {
                    'Content-Type': 'text/plain'
                }
            };
        }
        catch (err) {
            return {
                statusCode: 500,
                body: JSON.stringify(err),
                headers: {
                    'Content-Type': 'text/plain'
                }
            };
        }
    }
    if (path === 'docs') {
        const docs = fs.readFileSync(path_1.join(__dirname, 'docs.html'));
        return {
            statusCode: 200,
            body: String(docs),
            headers: {
                'Content-Type': 'text/html'
            }
        };
    }
    if (path === 'zips') {
        switch (method.toUpperCase()) {
            case 'GET':
                return zips.get(event);
            case 'POST':
                return zips.post(event);
            default:
                return notFound;
        }
    }
    else {
        return notFound;
    }
}
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSx1Q0FBb0M7QUFDcEMseUJBQXdCO0FBQ3hCLCtCQUFvQztBQUVwQyxpREFBaUQ7QUFDakQsNkNBQTZDO0FBQzdDLE1BQU0sSUFBSSxHQUFHLElBQUksaUJBQU8sRUFBRSxDQUFDO0FBRXBCLEtBQUssVUFBVSxPQUFPLENBQUMsS0FBdUI7SUFDbkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUN6QyxNQUFNLFFBQVEsR0FBRztRQUNmLFVBQVUsRUFBRSxHQUFHO1FBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDbkIsVUFBVSxFQUFFLEdBQUc7WUFDZixLQUFLLEVBQUUsR0FBRyxLQUFLLENBQUMsVUFBVSxJQUFJLEtBQUssQ0FBQyxJQUFJLFlBQVk7U0FDckQsQ0FBQztLQUNILENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNwQyxNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFBO0lBRS9CLFdBQVc7SUFDWCxxQkFBcUI7SUFDckIsZ0NBQWdDO0lBQ2hDLElBQUk7SUFDSixJQUFJLElBQUksS0FBSyxPQUFPLEVBQUU7UUFDcEIsT0FBTztZQUNMLFVBQVUsRUFBRSxHQUFHO1lBQ2YsSUFBSSxFQUFFLE9BQU87U0FDZCxDQUFBO0tBQ0Y7SUFFRCxJQUFJLElBQUksS0FBSyxVQUFVLEVBQUU7UUFDdkIsSUFBSTtZQUNGLE1BQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUE7WUFDMUMsT0FBTztnQkFDTCxVQUFVLEVBQUUsR0FBRztnQkFDZixJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUseURBQXlELENBQUM7Z0JBQ2hHLE9BQU8sRUFBRTtvQkFDUCxjQUFjLEVBQUUsWUFBWTtpQkFDN0I7YUFDRixDQUFBO1NBQ0Y7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNaLE9BQU87Z0JBQ0wsVUFBVSxFQUFFLEdBQUc7Z0JBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDO2dCQUN6QixPQUFPLEVBQUU7b0JBQ1AsY0FBYyxFQUFFLFlBQVk7aUJBQzdCO2FBQ0YsQ0FBQTtTQUNGO0tBQ0Y7SUFFRCxJQUFJLElBQUksS0FBSyxNQUFNLEVBQUU7UUFDbkIsTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxXQUFJLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUE7UUFDMUQsT0FBTztZQUNMLFVBQVUsRUFBRSxHQUFHO1lBQ2YsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDbEIsT0FBTyxFQUFFO2dCQUNQLGNBQWMsRUFBRSxXQUFXO2FBQzVCO1NBQ0YsQ0FBQTtLQUNGO0lBRUQsSUFBSSxJQUFJLEtBQUssTUFBTSxFQUFFO1FBQ25CLFFBQVEsTUFBTSxDQUFDLFdBQVcsRUFBRSxFQUFFO1lBQzVCLEtBQUssS0FBSztnQkFDUixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDeEIsS0FBSyxNQUFNO2dCQUNULE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUN6QjtnQkFDRSxPQUFPLFFBQVEsQ0FBQTtTQUNsQjtLQUNGO1NBQU07UUFDTCxPQUFPLFFBQVEsQ0FBQTtLQUNoQjtBQUNILENBQUM7QUFwRUQsMEJBb0VDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgemlwY29kZXMgZnJvbSBcIi4vZGF0YS5qc29uXCI7XHJcbmltcG9ydCB7IEh0dHBSZXF1ZXN0RXZlbnQgfSBmcm9tIFwiLi90eXBlcy9ldmVudFwiO1xyXG5pbXBvcnQgeyBaaXBDb2RlIH0gZnJvbSBcIi4vemlwY29kZVwiO1xyXG5pbXBvcnQgKiBhcyBmcyBmcm9tICdmcydcclxuaW1wb3J0IHsgZGlybmFtZSwgam9pbiB9IGZyb20gJ3BhdGgnXHJcblxyXG4vLyBjb3VsZCB0aGVvcmV0aWNhbGx5IGJlIHVzZWQgYWNyb3NzIGludm9jYXRpb25zXHJcbi8vIHRoaXMgaW1wcm92ZXMgZWZmaWNpZW5jeSBieSBhIHNtYWxsIG1hcmdpblxyXG5jb25zdCB6aXBzID0gbmV3IFppcENvZGUoKTtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKGV2ZW50OiBIdHRwUmVxdWVzdEV2ZW50KSB7XHJcbiAgY29uc29sZS5sb2coZXZlbnQucGF0aCwgZXZlbnQuaHR0cE1ldGhvZClcclxuICBjb25zdCBub3RGb3VuZCA9IHtcclxuICAgIHN0YXR1c0NvZGU6IDQwNCxcclxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgc3RhdHVzQ29kZTogNDA0LFxyXG4gICAgICBlcnJvcjogYCR7ZXZlbnQuaHR0cE1ldGhvZH0gJHtldmVudC5wYXRofSBub3QgZm91bmRgXHJcbiAgICB9KSxcclxuICB9O1xyXG4gIFxyXG4gIGNvbnN0IHBhdGggPSBldmVudC5wYXRoLnN1YnN0cmluZygxKVxyXG4gIGNvbnN0IG1ldGhvZCA9IGV2ZW50Lmh0dHBNZXRob2RcclxuXHJcbiAgLy8gcmV0dXJuIHtcclxuICAvLyAgIHN0YXR1c0NvZGU6IDIwMCxcclxuICAvLyAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGV2ZW50KVxyXG4gIC8vIH1cclxuICBpZiAocGF0aCA9PT0gJ2RlYnVnJykge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc3RhdHVzQ29kZTogMjAwLFxyXG4gICAgICBib2R5OiAnaGVsbG8nXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpZiAocGF0aCA9PT0gJ2RvY3MueW1sJykge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgZG9jcyA9IGZzLnJlYWRGaWxlU3luYygnLi9kb2NzLnltbCcpXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxyXG4gICAgICAgIGJvZHk6IFN0cmluZyhkb2NzKS5yZXBsYWNlKCd7e3VybH19JywgJ2h0dHBzOi8vNWs0MW1tdW1jai5leGVjdXRlLWFwaS51cy1lYXN0LTEuYW1hem9uYXdzLmNvbS8nKSxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ3RleHQvcGxhaW4nXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBzdGF0dXNDb2RlOiA1MDAsXHJcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZXJyKSxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ3RleHQvcGxhaW4nXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpZiAocGF0aCA9PT0gJ2RvY3MnKSB7XHJcbiAgICBjb25zdCBkb2NzID0gZnMucmVhZEZpbGVTeW5jKGpvaW4oX19kaXJuYW1lLCAnZG9jcy5odG1sJykpXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzdGF0dXNDb2RlOiAyMDAsXHJcbiAgICAgIGJvZHk6IFN0cmluZyhkb2NzKSxcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICdDb250ZW50LVR5cGUnOiAndGV4dC9odG1sJ1xyXG4gICAgICB9XHJcbiAgICB9IFxyXG4gIH1cclxuXHJcbiAgaWYgKHBhdGggPT09ICd6aXBzJykge1xyXG4gICAgc3dpdGNoIChtZXRob2QudG9VcHBlckNhc2UoKSkge1xyXG4gICAgICBjYXNlICdHRVQnOlxyXG4gICAgICAgIHJldHVybiB6aXBzLmdldChldmVudClcclxuICAgICAgY2FzZSAnUE9TVCc6XHJcbiAgICAgICAgcmV0dXJuIHppcHMucG9zdChldmVudClcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICByZXR1cm4gbm90Rm91bmRcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIG5vdEZvdW5kXHJcbiAgfVxyXG59XHJcbiJdfQ==