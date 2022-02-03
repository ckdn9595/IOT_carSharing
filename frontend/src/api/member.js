import axios from "axios";
import { API_BASE_URL } from "../config/index"

axios.defaults.headers.post["Content-Type"] = "application/json";

async function login(member, success, fail) {
  await axios
    .post(`${API_BASE_URL}/user/login`, JSON.stringify(member))
    .then(success)
    .catch(fail);
}

async function findById(id, success, fail) {
  axios.defaults.headers["access-token"] =
    sessionStorage.getItem("access-token");
  console.log(id);
  await axios
    .get(`http://localhost:8000/user/info/${id}`)
    .then(success)
    .catch(fail);
}

function registerUser(user, success, fail) {
  console.log(user);
  return axios
    .post(`http://localhost:8000/user`, JSON.stringify(user))
    .then(success)
    .catch(fail);
}

function modifyUser(user, success, fail) {
  return axios.put("http://localhost:8000/user/{id}").then(success).catch(fail);
}

function deleteUser(id, success, fail) {
  return axios
    .delete(`http://localhost:8000/user/${id}`)
    .then(success)
    .catch(fail);
}
// function logout(success, fail)

export { login, findById, registerUser, modifyUser, deleteUser };
