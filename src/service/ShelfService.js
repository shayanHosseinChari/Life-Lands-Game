import axios from "axios";
import {
  deleteShelfAPI,
  getFileAPI,
  getShelfsItemsAPI,
  insertShelf,
  insertShelfAPI,
  postsSearchEngineAPI,
} from "./APIs";
import lifeLandsAPI, { requestConfig } from "./axiosConfig";

export const getShelfsItemsService = async () => {
  return lifeLandsAPI.get(getShelfsItemsAPI);
};

export const insertShelfService = async (shelf) => {
  return lifeLandsAPI.post(insertShelfAPI, shelf);
};

export const deleteShelfService = async (bookId) => {
  return lifeLandsAPI.delete(deleteShelfAPI + bookId);
};

export const insertService = async (title) => {
  return lifeLandsAPI.post(insertShelf, { title });
};
