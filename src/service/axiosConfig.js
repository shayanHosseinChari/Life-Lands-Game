import axios from "axios";
import { getValueFor } from "../appsetting/storeConfig";
import { OpenToast } from "../components/share/OpenToast";

export let token = "eeeeeeeee";
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzE4NjUwN2Y3YzcxMWVmNDIxODQ5YjciLCJmdWxsTmFtZSI6ItmF2K3ZhdivINis2YjYp9ivINit2KzYqtuMIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjY0OTYzODA1fQ.VNRa_BCQnRyC4_EfvY3hHPrjGz61uE0bkNf8s7PHW6U

const lifeLandsAPI = axios.create({
  baseURL: "https://lifelands.ir/api/v1",
  // headers: {
  //   token,
  // },
});
lifeLandsAPI.interceptors.request.use(async function (config) {
  let newToken = await getValueFor();

  config.headers.token = newToken;

  return config;
});
lifeLandsAPI.interceptors.response.use(
  (response) => response,
  manageErrorConnection
);
function manageErrorConnection(err) {
  console.log(err);
  if (
    err.response &&
    err.response.status >= 400 &&
    err.response.status <= 500
  ) {
    // this will trigger the `handleError` function in the promise chain
    // this will trigger the `handleError` function in the promise chain
    //console.log(err.response);
    //console.log(err.response.status);
    OpenToast("خطا رخ داد", "خطایی رخ داد لطفا موارد را بررسی نمایید", "error");
    // goToLogin();
    return Promise.reject(new Error("خطا رخ داد"));
  } else if (err.code === "ECONNREFUSED") {
    // this will trigger the `handlerResponse` function in the promise chain
    // bacause we are not returning a rejection! Just an example
    return "nevermind";
  } else {
    return Promise.reject(err);
  }
}
export default lifeLandsAPI;
export const requestConfig = (params) => {
  return {
    ...params,
    ...{
      headers: {
        token,
      },
    },
  };
};
