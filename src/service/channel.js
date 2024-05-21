import {
  appSettingAPI,
  getChannelAPI,
  getChannelsAPI,
  getChannelsVideosPlaylistsChannelsAPI,
  getMobileSingleChannelAPI,
  getSingleChannelAPI,
} from "./APIs";
import lifeLandsAPI from "./axiosConfig";

export const getChannelsService = async (department) => {
  return lifeLandsAPI.get(getChannelsAPI, {
    params: {
      department,
    },
  });
};

export const getChannelService = async (id) => {
  return lifeLandsAPI.get(`${getChannelAPI}${id}`);
};

//دریافت پلی لیست های یک کانال(ویدیو)
export const getChannelsVideosPlaylistsChannelsService = (
  channelUserName,
  filter
) => {
  return lifeLandsAPI.get(
    `${getChannelsVideosPlaylistsChannelsAPI}${channelUserName}`,
    {
      params: filter,
    }
  );
};
//دریافت اطلاعات یک کانال برای عموم
export const getSingleChannelService = (channelUserName) => {
  return lifeLandsAPI.get(`${getSingleChannelAPI}${channelUserName}`);
};
//دریافت اطلاعات یک کانال برای عموم
export const getMobileSingleChannelService = (data) => {
  return lifeLandsAPI.get(`${getMobileSingleChannelAPI}`, {
    params: data,
  });
};
