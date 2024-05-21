import axios from "axios";
import {
  followAPI,
  forgetPasswordFirstAPI,
  forgetPasswordSecondAPI,
  getUsersDownloadDepartmentAPI,
  getUsersPostsAPI,
  getUsersSecurityAPI,
  loginAPI,
  profileAPI,
  publicProfileAPI,
  registerAPI,
  updateProfileAPI,
  updateUsersSecurityAPI,
} from "./APIs";
import lifeLandsAPI, { requestConfig } from "./axiosConfig";

export const followService = async (userId) => {
  return lifeLandsAPI.post(`${followAPI}`, { userId });
};

export const getProfileService = async () => {
  return lifeLandsAPI.get(`${profileAPI}`);
};

export const getPublicProfileService = async (id) => {
  return lifeLandsAPI.get(`${publicProfileAPI}${id}`);
};

export const updateProfileService = async (user) => {
  return lifeLandsAPI.put(`${updateProfileAPI}`, user);
};

export const loginService = async (user) => {
  return lifeLandsAPI.post(`${loginAPI}`, user);
};

export const forgetPasswordFirstStepService = (data) => {
  return lifeLandsAPI.post(`${forgetPasswordFirstAPI}`, data);
};

export const forgetPasswordSecondStepService = (data) => {
  return lifeLandsAPI.post(`${forgetPasswordSecondAPI}`, data);
};

export const registerService = async (user) => {
  return lifeLandsAPI.post(`${registerAPI}`, user);
};

export const getUsersSecurityService = async () => {
  return lifeLandsAPI.get(`${getUsersSecurityAPI}`);
};

export const updateUsersSecurityService = async (data) => {
  return lifeLandsAPI.put(`${updateUsersSecurityAPI}`, data);
};

export const getUsersDownloadDepartmentService = async (filter) => {
  return lifeLandsAPI.get(`${getUsersDownloadDepartmentAPI}`, {
    params: filter,
  });
};

export const getUsersPostsService = async (filter, userId) => {
  console.log("filterfilterfilter");
  console.log(filter);
  console.log(userId);
  return lifeLandsAPI.get(`${getUsersPostsAPI}${userId}`, {
    params: filter,
  });
};
