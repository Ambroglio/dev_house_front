import axios from "axios";
import {ConnectUser} from "../app/userAction";

const baseUrl = "http://localhost:3000/"

function getAuthorizationHeader(jwt: string) {
    return {"Authorization": "Bearer " + jwt}
}

function registerUser(connectUser: ConnectUser) {
    return axios.post(baseUrl + "signup", connectUser)
}

function loginUser(connectUser: ConnectUser) {
    return axios.post(baseUrl + "signin", connectUser)
}

function verifyJwt(jwt: string) {
    return axios.post(baseUrl + "verify", {jwt: jwt})
}

function getMember(id: string, jwt: string) {
    return axios.get(baseUrl + "member/" + id, {
        headers:
            getAuthorizationHeader(jwt)
    })
}

function deleteMember(id: string, jwt: string) {
    return axios.delete(baseUrl + "member/" + id, {
        headers:
            getAuthorizationHeader(jwt)
    })
}

export default {
    registerUser, loginUser, verifyJwt, getMember, deleteMember
}