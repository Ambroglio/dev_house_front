import axios from "axios-jsonp-pro";

const baseUrl = "http://dev.virtualearth.net/REST/v1/"

function getCity(latitude: string, longitude: string, bingKey: string) {
    return axios.get(
        `${baseUrl}Locations/${latitude},${longitude}?o=json&key=${bingKey}`
    )
}

export default {
    getCity
}