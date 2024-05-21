import { getAllCommentsAPI, getCommentsAPI } from "./APIs";
import lifeLandsAPI from "./axiosConfig";

export const getPostsCommentsService = async (postId, filter) => {
  return lifeLandsAPI.get(getCommentsAPI + postId, {
    params: filter,
  });
};

export const getAllCommentsService = async (filter) => {
  return lifeLandsAPI.get(getAllCommentsAPI, {
    params: filter,
  });
};
