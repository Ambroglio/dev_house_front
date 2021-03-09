import axios from "axios";

const baseUrl = "http://localhost:8099/"

function getOffersByMemberId(memberId: string) {
    return axios.get(`${baseUrl}offers/member/${memberId}`)
}