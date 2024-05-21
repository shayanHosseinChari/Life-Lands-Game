import {
  getLastVideoPlayListsAPI,
  getLastVoicePlayListsAPI,
  getPlayListsAPI,
  getPlaylistsVideosAPI,
  getPlaylistsVoicesAPI,
  getPublicPlayListsVideosAPI,
  getPublicPlayListsVoiceAPI,
  getVoicePlayListsAPI,
  postsSearchEngineAPI,
} from "./APIs";
import lifeLandsAPI from "./axiosConfig";

export const getLastVideosPlayListsService = async () => {
  // /last/video/play/lists
  return lifeLandsAPI.get(getLastVideoPlayListsAPI);
};

export const getLastVoicesPlayListsService = async () => {
  // /last/voice/play/lists
  return lifeLandsAPI.get(getLastVoicePlayListsAPI);
};

// دریافت پلی لیست ویدیو برای عموم
export const getPublicPlayListsVideosServer = (id, videoId, filter) => {
  // /public/play/lists/videos/:id/:videoId
  return lifeLandsAPI.get(`${getPublicPlayListsVideosAPI}${id}/${videoId}`, {
    params: filter,
  });
};

// دریافت پلی لیست ویدیو برای عموم
export const getPublicPlayListsVoicesServer = (id, voiceId, filter) => {
  // /public/play/lists/voice/:id/:videoId
  return lifeLandsAPI.get(`${getPublicPlayListsVoiceAPI}${id}/${voiceId}`, {
    params: filter,
  });
};

//دریافت اطلاعات پلی لیست صدا ها
export const getPlayListsVoicesService = (id, filter) => {
  return lifeLandsAPI.get(`${getPlaylistsVoicesAPI}${id}`, {
    params: filter,
  });
};

//دریافت اطلاعات پلی لیست ویدیو ها ها
export const getPlayListsVideosService = (id, filter) => {
  return lifeLandsAPI.get(`${getPlaylistsVideosAPI}${id}`, {
    params: filter,
  });
};

//دریافت فهرست پلی لیست صدا ها
export const getVoicePlayListsService = (filter) => {
  return lifeLandsAPI.get(`${getVoicePlayListsAPI}`, {
    params: filter,
  });
};

//دریافت پلی لیست ها
export const getPlayListsService = (filter) => {
  return lifeLandsAPI.get(`${getPlayListsAPI}`, {
    params: filter,
  });
};
