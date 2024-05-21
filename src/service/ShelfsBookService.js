import { getShelfsBooks } from "./APIs";
import lifeLandsAPI from "./axiosConfig";

export const getShelfsBooksService = async (id) => {
  return lifeLandsAPI.get(getShelfsBooks + id);
};
