import { insertCommentAPI, roomsAPI } from "./APIs";
import lifeLandsAPI from "./axiosConfig";

export const roomsService = async (filter) => {
  return lifeLandsAPI.get(`${roomsAPI}`, { params: filter });
};
