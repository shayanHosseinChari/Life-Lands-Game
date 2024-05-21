import {
  getCompetitionAPI,
  mobileTournamentPageAPI,
  usersCompetitionsAPI,
} from "./APIs";
import lifeLandsAPI from "./axiosConfig";

//دریافت اطلاعات صفحه ی رقابت های اخیر کاربر
export const usersCompetitionsServer = (filter) => {
  return lifeLandsAPI.get(`${usersCompetitionsAPI}`, {
    params: filter,
  });
};
export const getCompetitionService = (id) => {
  return lifeLandsAPI.get(`${getCompetitionAPI}${id}`);
};
