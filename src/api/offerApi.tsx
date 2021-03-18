import axios from "axios";
import {CreateOffer} from "../app/offerAction";

const baseUrl = "http://localhost:8099/"

function getAuthorizationHeader(jwt: string) {
    return {"Authorization": "Bearer " + jwt}
}

function getOffersByMemberId(memberId: string) {
    return axios.get(`${baseUrl}offers/member/${memberId}`)
}

function getAllOffers() {
    return axios.get(`${baseUrl}offers/`)
}

function getOfferById(offerId: string) {
    return axios.get(`${baseUrl}offers/${offerId}`)
}

function createOffer(jwt: string, offer: CreateOffer) {
    return axios.post(baseUrl + "offers/", offer, {
        headers: getAuthorizationHeader(jwt)
    })
}

function updateOffer(id: string, jwt: string, offer: CreateOffer) {
    return axios.put(baseUrl + "offers/" + id, offer, {
        headers: getAuthorizationHeader(jwt)
    })
}

function deleteOffer(id: string, jwt: string) {
    return axios.delete(baseUrl + "offers/" + id, {
        headers: getAuthorizationHeader(jwt)
    })
}

function getOffersByCityName(cityName: string) {
    return axios.get(`${baseUrl}offers/city/${cityName}`)
}

function getCities() {
    return axios.get(`${baseUrl}cities/`)
}

export default {
    getOffersByMemberId, getAllOffers, getOfferById,
    createOffer, updateOffer, deleteOffer,
    getOffersByCityName,
    getCities
}