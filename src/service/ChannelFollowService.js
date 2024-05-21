import { channelFollowAPI, usersChannelsFollowAPI } from "./APIs";
import lifeLandsAPI from "./axiosConfig";

// فالو و آنفالو چنل
export const channelFollowService = (data) => {
  // /paints
  return lifeLandsAPI.post(`${channelFollowAPI}`, data);
};

// دریافت کانال های یک کاربر
export const usersChannelsFollowService = (filter) => {
  // /users/channels/follow
  return lifeLandsAPI.get(`${usersChannelsFollowAPI}`, {
    params: filter,
  });
};
