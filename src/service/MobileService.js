import {
  getUsersSearchHistoriesAPI,
  mobileBooksPageAPI,
  MobileHomeAPI,
  mobileRadioPageAPI,
  mobileSearchEngineAPI,
  mobileTournamentPageAPI,
  mobileWGamesPageAPI,
} from "./APIs";
import lifeLandsAPI from "./axiosConfig";

// دریافت پلی لیست ویدیو برای عموم
export const mobileHomeServer = () => {
  return lifeLandsAPI.get(`${MobileHomeAPI}`);
};

// دریافت اطلاعات برای صقحه ی کتاب
export const mobileBookPageServer = () => {
  return lifeLandsAPI.get(`${mobileBooksPageAPI}`);
};

//دریافت اطلاعات صفحه ی tournament
export const mobileTournamentPageServer = () => {
  return lifeLandsAPI.get(`${mobileTournamentPageAPI}`);
};

//دریافت اطلاعات صفحه ی رادیو
export const mobileRadioPageServer = (filter) => {
  return lifeLandsAPI.get(`${mobileRadioPageAPI}`, { params: filter });
};

//دریافت اطلاعات صفحه ی wGames
export const mobileWGamesPageServer = () => {
  return lifeLandsAPI.get(`${mobileWGamesPageAPI}`);
};

//دریافت تاریخچه جستجو کاربر
export const getUsersSearchHistoriesServer = (filter) => {
  return lifeLandsAPI.get(`${getUsersSearchHistoriesAPI}`, { params: filter });
};

//جستجو کل سیستم
export const mobileSearchEngineServer = (filter) => {
  return lifeLandsAPI.get(`${mobileSearchEngineAPI}`, { params: filter });
};
