import { confirmSmsAPI, sendSmsAPI } from "./APIs";
import lifeLandsAPI from "./axiosConfig";

export const sendSmsService = async (phoneNumber) => {
  return lifeLandsAPI.post(`${sendSmsAPI}`, { phoneNumber });
};

export const confirmSmsService = async (data) => {
  //console.log(data);
  return lifeLandsAPI.put(`${confirmSmsAPI}`, data);
};
