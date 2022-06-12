// import { Result } from 'aws-cdk-lib/aws-stepfunctions';
import * as zipcodes from "../static/data.json";
import { HttpRequestEvent } from "../types/event";
import { Zip } from "../types/zip";

export class Zips {
  post(event: HttpRequestEvent) {
    return {
      statusCode: 501,
      body: {
        message: "todo: implement this",
      },
    };
  }

  // If you were to literally send in a zip code such as: '23224'
  get(event: HttpRequestEvent) {
    let zips = [...zipcodes];

    if (event.pathParameters) {
      const zip = zips.find((zip) => zip.zip === event?.pathParameters?.zip);
      if (zip === undefined) {
        return {
          statusCode: 404,
          body: `${event.pathParameters.zip} was not found in the data set`,
        };
      }
      return {
        statusCode: 200,
        body: JSON.stringify(zip),
      };
    }

    const queryParams = event.queryStringParameters;
    if (queryParams) {
      if (queryParams.zip !== undefined) {
        zips = zips.filter((zip) => zip.zip.includes(queryParams.zip));
      }
      if (queryParams.type !== undefined) {
        zips = zips.filter((zip) => zip.type === queryParams.type);
      }
      if (queryParams.primary_city !== undefined) {
        zips = zips.filter((zip) =>
          zip.primary_city.includes(queryParams.primary_city)
        );
      }
      if (queryParams.country !== undefined) {
        zips = zips.filter((zip) => zip.country === queryParams.country);
      }

      if (queryParams.timezone !== undefined) {
        zips = zips.filter((zip) => zip.timezone === queryParams.timezone);
      }

      if (queryParams.area_codes !== undefined) {
        const areaCode = queryParams?.area_codes;
        zips = zips.filter((zip) => {
          const areaCodes = zip.area_codes?.split(",");
          if (areaCodes?.includes(areaCode)) {
            return true;
          }
          return false;
        });
      }

      if (queryParams.coordinates !== undefined) {
        // default k (limit of results to return) to 10
        const k =
          queryParams.limit !== undefined ? parseInt(queryParams.limit) : 10;

        const latitude = parseFloat(queryParams.coordinates.split(",")[0]);
        const longitude = parseFloat(queryParams.coordinates.split(",")[1]);
        zips = this.kClosestZips(zips, { latitude, longitude }, k);
      }

      if (queryParams.state !== undefined) {
        zips = zips.filter((zip) => zip.state === queryParams.state);
      }

      if (queryParams.limit !== undefined) {
        const limit = parseInt(queryParams.limit);
        zips = zips.slice(0, limit);
      }
    }
    return {
      statusCode: 200,
      body: JSON.stringify(zips),
    };
  }

  /**
   * This function is using the Euclidian distance formula
   * In other words, I have assuemd the Earth is flat
   * @param zips
   * @param k
   */
  kClosestZips(zips: Array<any>, point: Coordinate, k: number): Array<Zip> {
    const zipsWithDistance = zips.map((zip) => {
      zip.distance =
        Math.pow(parseFloat(zip.latitude) - point.latitude, 2) +
        Math.pow(parseFloat(zip.longitude) - point.longitude, 2);
      return zip;
    });

    zipsWithDistance.sort((a, b) => {
      return a.distance - b.distance;
    });

    const result = [];
    k = Math.min(k, zipsWithDistance.length);
    for (let i = 0; i < k; i++) {
      delete zipsWithDistance[i].distance;
      result.push(zipsWithDistance[i]);
    }

    return result;
  }
}

interface Coordinate {
  latitude: number;
  longitude: number;
}
