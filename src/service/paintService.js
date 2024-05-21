import {
  deletePaintAPI,
  getPublicPlayListsVoiceAPI,
  insertPaintAPI,
  paintAPI,
  paintsAPI,
  updatePaintAPI,
  usersPaintAPI,
} from "./APIs";
import lifeLandsAPI from "./axiosConfig";

// ثبت نقاشی توسط کاربران
export const insertPaintService = (data) => {
  // /insert/paint
  return lifeLandsAPI.post(`${insertPaintAPI}`, data);
};

// بروزرسانی نقاشی توسط کاربران
export const updatePaintService = (id, data) => {
  // /update/paint/:id
  return lifeLandsAPI.put(`${updatePaintAPI}${id}`, data);
};

// دریافت نقاشی های منتشر شده و تایید شده
export const paintsService = (filter) => {
  // /paints
  return lifeLandsAPI.get(`${paintsAPI}`, {
    params: filter,
  });
};

// دریافت اطلاعات یک نقاشی با استفاده از ای دی آن
export const paintService = (id) => {
  // /paint
  return lifeLandsAPI.get(`${paintAPI}${id}`);
};

// دریافت نقاشی های کاربر
export const usersPaintService = (filter) => {
  // users/paints
  return lifeLandsAPI.get(`${usersPaintAPI}`, { params: filter });
};

// دریافت نقاشی های کاربر
export const deletePaintService = (paintId) => {
  // /paint/:id
  return lifeLandsAPI.delete(`${deletePaintAPI}${paintId}`);
};
