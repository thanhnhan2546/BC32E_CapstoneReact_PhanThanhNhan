import axios from "axios";
import { Auth, DOMAIN, tokenCyberSoft } from "../utils/api";

export class MethodSevices {
  get = (url) => {
    const config = {
      method: "get",
      url: DOMAIN + url,
      headers: {
        TokenCyberSoft: tokenCyberSoft,
      },
    };
    return axios(config);
  };
  postNoneToken = (url, data) => {
    const config = {
      method: "post",
      url: DOMAIN + url,
      data,
      headers: {
        TokenCyberSoft: tokenCyberSoft,
      },
    };
    return axios(config);
  };
  postToken = (url, data) => {
    const config = {
      method: "post",
      url: DOMAIN + url,
      data,
      headers: {
        TokenCyberSoft: tokenCyberSoft,
        Authorization: Auth,
      },
    };
    console.log("config: ", config);
    return axios(config);
  };

  delete = (url) => {
    const config = {
      method: "delete",
      url: DOMAIN + url,
      headers: {
        TokenCyberSoft: tokenCyberSoft,
        Authorization: Auth,
      },
    };
    return axios(config);
  };
}

const services = new MethodSevices();

export default services;
