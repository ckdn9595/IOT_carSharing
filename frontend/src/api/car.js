import axios from "axios";
import { API_BASE_URL } from "../config/index"

axios.defaults.headers.post["Content-Type"] = "application/json";

async function getCarInfo(param ,success, fail) {
  await axios
    .post(`${API_BASE_URL}/search`, param)
    .then(success)
    .catch(fail);
}
export { getCarInfo};
