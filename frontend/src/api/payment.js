import axios from "axios";
import { API_BASE_URL } from "../config/index"

axios.defaults.headers.post["Content-Type"] = "application/json";


async function getPayment(data,success, fail) {
  axios.defaults.headers["Authorization"] 
    = `Bearer ${sessionStorage.getItem("access_token")}`
  await axios
    .get(`${API_BASE_URL}/user/payment`)
    .then(success)
    .catch(fail);
}

async function registerPayment(param, success, fail) {
    axios.defaults.headers["Authorization"] 
    = `Bearer ${sessionStorage.getItem("access_token")}`
  await axios
    .post(`${API_BASE_URL}/user/payment`, JSON.stringify(param))
    .then(success)
    .catch(fail);
}


export {  registerPayment, getPayment };
