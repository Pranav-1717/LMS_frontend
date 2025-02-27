import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080",
    headers: { "Content-Type": "application/json" },
    withCredentials: true, // Allows refresh token to be sent via cookies
});

//  Login API (No Change)
export const login_api = async (id, password) => {
    try {
        const response = await api.post("auth/login", {
            teacherRegistrationId: id,
            password: password,
        });
        console.log("response" , response);
        return response;
    } catch (error) {
        console.log("Login failed", error);
        return null;
    }
};

//  Refresh Token API
export const refresh_token_api = async () => {
    try {
        const response = await api.post("auth/refresh");
        return response; // Returns new access token
    } catch (error) {
        console.log("Token refresh failed", error);
        return null;
    }
};

//  Axios Interceptor (Auto-Refresh Token)
api.interceptors.response.use(
    (response) => response, // If response is OK, return it
    async (error) => {
        const originalRequest = error.config;

        // If token expired (401 error) and request not retried yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Mark request as retried

            try {
                const refreshResponse = await refresh_token_api();
                if (refreshResponse?.data?.accessToken) {
                    api.defaults.headers.common["Authorization"] = `Bearer ${refreshResponse.data.accessToken}`;
                    originalRequest.headers["Authorization"] = `Bearer ${refreshResponse.data.accessToken}`;
                    return api(originalRequest); // Retry the failed request
                }
            } catch (refreshError) {
                console.log("Token refresh failed, logging out...");
            }
        }

        return Promise.reject(error);
    }
);

export default api;
