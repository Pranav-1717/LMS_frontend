import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
});

// Function to Set Authorization Header Dynamically
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.Authorization;
  }
};

// Fetch available teachers based on date, start time, and end time
export const fetchAvailableTeachers = async (date, startTime, endTime) => {
  try {
    const response = await api.get(`/substitution/available-teachers`, {
      params: { date, startTime, endTime },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching available faculty:", error);
    return { data: [] };
  }
};

// Send a request to another teacher
export const sendRequestToTeacher = async (requestData) => {
  try {
    const response = await api.post(`/inbox/sent-message`, requestData);
    return response.data;
  } catch (error) {
    handleApiError(error, "sendRequestToTeacher");
    return { status: "Failed" };
  }
};

// Submit a leave application
export const submitLeaveApplication = async (formData) => {
  try {
    const response = await api.post(`/leave/apply`, formData);
    return response.data;
  } catch (error) {
    handleApiError(error, "submitLeaveApplication");
    return { status: "Failed" };
  }
};

// Error Handling Function
const handleApiError = (error, functionName) => {
  if (axios.isAxiosError(error)) {
    console.error(` API Error in ${functionName}:`, error.message);
    if (error.response) {
      console.error("🔹 Server Response:", error.response.status, error.response.data);
    } else if (error.request) {
      console.error("🔹 No response received from server");
    } else {
      console.error("🔹 Request setup error:", error.message);
    }
  } else {
    console.error(`Unexpected error in ${functionName}:`, error);
  }
};

export default api;
