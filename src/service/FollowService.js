import { followActionAPI, getFolloweresAPI, getFollowingAPI } from "./APIs";
import lifeLandsAPI from "./axiosConfig";

//فالو و آنفالو کردن
export const followActionServer = (userId) => {
  return lifeLandsAPI.post(`${followActionAPI}`, { userId });
};
//دریافت فالوور ها
export const getFolloweresServer = (userId) => {
  return lifeLandsAPI.get(`${getFolloweresAPI}${userId}`);
};
//دریافت فالووینگ ها
export const getFollowingServer = (userId) => {
  return lifeLandsAPI.get(`${getFollowingAPI}${userId}`);
};
