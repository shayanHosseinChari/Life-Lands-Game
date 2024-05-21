import { getUserScoresAPI } from "./APIs";
import lifeLandsAPI from "./axiosConfig";

export const getUserScoresService = async (filter) => {
  return lifeLandsAPI.get(`/ddd/user/scores`, {
    params: filter,
  });
};
