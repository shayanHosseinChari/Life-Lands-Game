import axios from "axios";
import {
  addRunCountAPI,
  allCommentAPI,
  booksAPI,
  categoriesAPI,
  consoleGameAPI,
  gamesAPI,
  gamesCategoriesAPI,
  getAllGamesAPI,
  getBookAPI,
  getGameAPI,
  getLastGamesDownloadedAPI,
  getVideoAPI,
  insertCommentAPI,
  likePostAPI,
  mainGameAPI,
  miniGameAPI,
  paintsAPI,
  postsSearchEngineAPI,
  videosAPI,
} from "./APIs";
import lifeLandsAPI from "./axiosConfig";

export const postsSearchEngineService = async (filter) => {
  return lifeLandsAPI.get(postsSearchEngineAPI, {
    params: filter,
  });
};

export const getVideoAPIService = async (videoId, filter) => {
  return lifeLandsAPI.get(`${getVideoAPI}${videoId}`, {
    params: filter,
  });
};

export const insertCommentService = async (comment) => {
  return lifeLandsAPI.post(`${insertCommentAPI}`, comment);
};

export const getGameAPIService = async (gameId, filter) => {
  return lifeLandsAPI.get(`${getGameAPI}${gameId}`, {
    params: filter,
  });
};

export const getAllGamesService = async () => {
  return lifeLandsAPI.get(`${getAllGamesAPI}`);
};

export const getBookAPIService = async (bookId, filter) => {
  return lifeLandsAPI.get(`${getBookAPI}${bookId}`, {
    params: filter,
  });
};

export const getCategoriesService = async (filter) => {
  return lifeLandsAPI.get(`${categoriesAPI}`, {
    params: filter,
  });
};

export const publicGamesService = async (filter) => {
  console.log("filter", filter);
  return lifeLandsAPI.get(`${gamesAPI}`, {
    params: filter,
  });
};

export const publicVideosService = async (filter) => {
  return lifeLandsAPI.get(`${videosAPI}`, {
    params: filter,
  });
};
export const publicBooksService = async (filter) => {
  return lifeLandsAPI.get(`${booksAPI}`, {
    params: filter,
  });
};
export const addRunCountService = async (id) => {
  return lifeLandsAPI.put(`${addRunCountAPI}${id}`);
};

export const miniGameService = async (filter) => {
  return lifeLandsAPI.get(`${miniGameAPI}`, {
    params: filter,
  });
};

export const mainGameService = async (filter) => {
  return lifeLandsAPI.get(`${mainGameAPI}`, {
    params: filter,
  });
};

export const consoleGameService = async (filter) => {
  return lifeLandsAPI.get(`${consoleGameAPI}`, {
    params: filter,
  });
};

export const likePostService = async (data) => {
  return lifeLandsAPI.post(`${likePostAPI}`, data);
};

export const gamesCategoriesService = (filter) => {
  return lifeLandsAPI.get(`${gamesCategoriesAPI}`, {
    params: filter,
  });
};

export const getLastGamesDownloadedService = (filter) => {
  return lifeLandsAPI.get(`${getLastGamesDownloadedAPI}`, {
    params: filter,
  });
};

export const allCommentService = (filter) => {
  return lifeLandsAPI.get(`${allCommentAPI}`, {
    params: filter,
  });
};

export const publicPaintsService = (filter) => {
  return lifeLandsAPI.get(`${paintsAPI}`, {
    params: filter,
  });
};
