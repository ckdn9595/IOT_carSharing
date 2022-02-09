import axios from "axios";
import { API_BASE_URL } from "../config/index"

axios.defaults.headers.post["Content-Type"] = "application/json";

async function login(member, success, fail) {
  await axios
    .post(`${API_BASE_URL}/user/login`, JSON.stringify(member))
    .then(success)
    .catch(fail);
}

async function getUserInfo(success, fail) {
  axios.defaults.headers["access_token"] =
    sessionStorage.getItem("access_token");
  await axios
    .get(`${API_BASE_URL}/user/info`)
    .then(success)
    .catch(fail);
}

async function registerUser(data, success, fail) {
  console.log(data);
  await axios
    .post(`${API_BASE_URL}/user/register`, JSON.stringify(data))
    .then(success)
    .catch(fail);
}

function modifyUser(data, success, fail) {
  axios.defaults.headers["access_token"] =
    sessionStorage.getItem("access_token");
  return axios
  .post(`${API_BASE_URL}/user/info`, JSON.stringify(data))
  .then(success)
  .catch(fail);
}

function deleteUser(id, success, fail) {
  return axios
    .delete(`http://localhost:8000/user/${id}`)
    .then(success)
    .catch(fail);
}
// function logout(success, fail)

export { login, getUserInfo, registerUser, modifyUser, deleteUser };
