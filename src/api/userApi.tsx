import axios from "axios";
import {ConnectUser} from "../app/userAction";

const baseUrl = "http://localhost:3000/"

function registerUser(connectUser: ConnectUser) {
    return axios.post(baseUrl + "signup", connectUser)
}

export default {
    registerUser
}