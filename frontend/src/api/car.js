import axios from "axios";
import { API_BASE_URL } from "../config/index"

axios.defaults.headers.post["Content-Type"] = "application/json";

async function getCarInfo(param ,success, fail) {
  await axios
    .post(`${API_BASE_URL}/search`, param)
    .then(success)
    .catch(fail);
}

async function searchAddressByName(keyWord ,success, fail){
  axios.defaults.headers["Authorization"] 
    = `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_API_SEARCH}`;
  await axios
    .get(`https://dapi.kakao.com/v2/local/search/keyword.json?query=${keyWord}`)
    .then(success)
    .catch(fail);
}
export { getCarInfo, searchAddressByName};
