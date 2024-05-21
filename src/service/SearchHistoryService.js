import axios from "axios";
import {
  deleteShelfAPI,
  getFileAPI,
  getShelfsItemsAPI,
  insertShelf,
  insertShelfAPI,
  searchHistoryClearAPI,
} from "./APIs";
import lifeLandsAPI from "./axiosConfig";

export const searchHistoryClearService = async (filter) => {
  return lifeLandsAPI.delete(searchHistoryClearAPI, { params: filter });
};
