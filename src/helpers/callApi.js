import axios from "./axios";
import { v4 as uuidv4 } from "uuid";
export const generateTokenApi = () => {
  const deviceId = uuidv4();
  return new Promise((resolve, reject) => {
    axios
      .post(`token/generate-token`, {
        deviceId
      })
      .then((res) => {
        resolve(res.data);
        sessionStorage.setItem("loginInfo", JSON.stringify(res.data.token));
      })
      .catch((err) => reject(err));
  });
};

export const pesonalDetailsApi = (data) => {
  const sessionData = JSON.parse(sessionStorage.getItem("loginInfo"));
  const access_token = sessionData;
  return new Promise((resolve, reject) => {
    axios
      .post(`details/personl-details`, data, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const previousAddressApi=(dataArray, id)=>{
  const sessionData = JSON.parse(sessionStorage.getItem("loginInfo"));
  const access_token = sessionData;
  let previousAddress = {previousAddress:dataArray}
  return new Promise((resolve, reject) => {
    axios
      .post(`details/previous-address/${id}`, previousAddress, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}
