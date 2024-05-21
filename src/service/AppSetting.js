import axios from "axios";
import { appSettingAPI } from "./APIs";
import lifeLandsAPI from "./axiosConfig";

export const appSettingService = async () => {
  return lifeLandsAPI.get(appSettingAPI);
};
