import axios from "axios";


import { clearLocalStorage } from 'utils/LocalStorage/LocalStorageUtils';

// Define the base URL based on the environment, only one of them should be used at a time
const instance = axios.create({
  baseURL: "https://backend-dot-alpine-avatar-399423.ts.r.appspot.com/", // Uncomment this before deploying
  // baseURL: "http://127.0.0.1:8000/", // Uncomment this when you run it locally
});

let refresh = false;

// Function to refresh the access token
const refreshToken = async () => {
  try {
    // Make a request to refresh the access token
    const response = await instance.post(
      "/api/token/refresh/",
      { refresh: localStorage.getItem("refresh_token") },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      console.log("success");

      // Update the access token in local storage
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);

      // Return the refreshed access token
      return {
        access: response.data.access,
        refresh: response.data.refresh,
      };
    } else {
      console.error(response);
      return Promise.reject(response);
    }
  } catch (error) {
    console.error(error);
    console.error(error.response.data);
    return Promise.reject(error);
  }
};

// Add your interceptor here
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401 && !refresh) {
      const access_token = localStorage.getItem("access_token");

      if (access_token) {
        refresh = true;

        try {
          // Perform token refreshing logic here
          const { access, refresh } = await refreshToken(); // Call your token refreshing function
          instance.defaults.headers.common["Authorization"] = `Bearer ${access}`;

          // Update the refresh token in error.config data
          error.config.data = JSON.stringify({ refresh_token: refresh });

          // Update the Authorization header in error.config
          error.config.headers["Authorization"] = `Bearer ${access}`;

          // Retry the original request
          return instance.request(error.config);
        } catch (refreshError) {
          // Handle token refreshing error or logout the user
          console.error("Issue with refreshing access token!");
          console.error(refreshError);

          // Check the URL of the original request
          if (error.config.url !== "/api/logout/") {
            const token = {
              refresh_token: localStorage.getItem("refresh_token"),
            };

            let res = await instance.post("/api/logout/", token, {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${access_token}`,
              },
              withCredentials: true,
            });
            if (res.status !== 200) {
              console.log(res);
            } else {
              console.log("Please refresh your screen!");
            }
          } else {
            console.log("Please refresh your screen!");
          }

          // Remove credentials in local storage
          clearLocalStorage();
          instance.defaults.headers.common["Authorization"] = null;
        }
      }
    }
    refresh = false;
    return Promise.reject(error);
  }
);


export default instance;
