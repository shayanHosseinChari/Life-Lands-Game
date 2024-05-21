import { categoriesAPI, insertSessionAPI } from "./APIs";
import lifeLandsAPI from "./axiosConfig";

export const insertSessionService = async () => {
  return lifeLandsAPI.post(`${insertSessionAPI}`, {
    os: "Android",
    browser: "",
  });
};
