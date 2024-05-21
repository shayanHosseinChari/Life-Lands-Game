import axios from "axios";
import { getFileAPI, postsSearchEngineAPI } from "./APIs";
import lifeLandsAPI, { requestConfig } from "./axiosConfig";

export const getFileService = async (
  postId,
  department,
  version = undefined
) => {
  return lifeLandsAPI.get(getFileAPI, {
    params: { postId, version, department },
  });
};
