import { getBookAPI, getLeadersboardsGames } from "./APIs";
import lifeLandsAPI from "./axiosConfig";

export const getLeadersboardsGamesService = async (gameId) => {
  return lifeLandsAPI.get(`${getLeadersboardsGames}${gameId}`);
};
