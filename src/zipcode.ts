import * as zipcodes from './data.json'
import { HttpRequestEvent } from './types/event';

export class ZipCode {
    constructor() {

    }

    post(event: HttpRequestEvent) {
        return {
            statusCode: 501,
            body: {
                message: 'todo: implement this'
            }
        }
    }

    // If you were to literally send in a zip code such as: '23224'
    get(event: HttpRequestEvent) {
        let zips = [
            ...zipcodes
        ]
        const queryParams = event.queryStringParameters;
        if (queryParams) {
            if (queryParams.zip !== undefined) {
                zips = zips.filter(zip => zip.zip.includes(queryParams.zip))
            }
            if (queryParams.type !== undefined) {
                zips = zips.filter(zip => zip.type === queryParams.type)
            }
            if (queryParams.primary_city !== undefined) {
                zips = zips.filter(zip => zip.primary_city.includes(queryParams.primary_city))
            }
            if (queryParams.country !== undefined) {
                zips = zips.filter(zip => zip.country === queryParams.country)
            }

            if (queryParams.area_codes !== undefined) {
                const areaCode = queryParams?.area_codes;
                zips = zips.filter(zip => {
                    const areaCodes = zip.area_codes?.split(",")
                    if (areaCodes?.includes(areaCode)) {
                        return true
                    }
                    return false
                })
            }
    
            // this could look like "acceptable_cities": "Healdville, Hortonville, Lake Hinevah, Summit"
            // if (queryParams.acceptable_cities !== undefined) {
            //     zips = zips.filter(zip => zip.acceptable_cities === queryParams.acceptable_cities)
            // }
            if (queryParams.state !== undefined) {
                zips = zips.filter(zip => zip.state === queryParams.state)
            }
        }
        return {
            statusCode: 200,
            body: JSON.stringify(zips)
        }
    }
}