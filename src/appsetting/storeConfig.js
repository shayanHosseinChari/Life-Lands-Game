import AsyncStorage from "@react-native-async-storage/async-storage";

let token;
let session;
let theme;
let menuVisible;
export const setToken = async (val) => {
  await AsyncStorage.setItem("token", val);
};
export const getToken = async () => {
  token = await AsyncStorage.getItem("token");
  return token;
};
export function save(value) {
  token = value;
}
export function getValueFor() {
  return token;
}

export const setSession = async (val) => {
  await AsyncStorage.setItem("session", val);
};
export const getSession = async () => {
  session = await AsyncStorage.getItem("session");
  return session;
};
export function saveSession(value) {
  session = value;
}

export function getValueForSession() {
  return session;
}

export const setTheme = async (val) => {
  await AsyncStorage.setItem("theme", val);
};
export const getTheme = async () => {
  theme = await AsyncStorage.getItem("theme");
  return theme;
};
export function saveTheme(value) {
  theme = value;
}
export function getValueForTheme() {
  return theme;
}

export const setMenuVisible = async (val) => {
  await AsyncStorage.setItem("menu-visible", val);
  menuVisible = val;
};
export const getMenuVisible = async () => {
  menuVisible = await AsyncStorage.getItem("menu-visible");
  return menuVisible;
};
export function saveMenuVisible(value) {
  menuVisible = value;
}
export function getValueForMenuVisible() {
  return menuVisible;
}
