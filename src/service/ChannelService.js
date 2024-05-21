import { getChannelsPublicAPI } from "./APIs";
import lifeLandsAPI from "./axiosConfig";

// ثبت نقاشی توسط کاربران
export const getChannelsPublicService = (data) => {
  // /public/channels
  return lifeLandsAPI.get(`${getChannelsPublicAPI}`, { params: data });
};
