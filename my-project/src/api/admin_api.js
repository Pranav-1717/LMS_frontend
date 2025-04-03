import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
    console.log("Authorization token set:", token);
  } else {
    delete api.defaults.headers.Authorization;
    console.log("Authorization token removed");
  }
};

//get teacher details by id
export const getTeacherDetails = async (teacherId) => {
  try {
    const response = await api.get(`/teachers/getTeacherDetails/${teacherId}`, {
      params: { id: teacherId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching teacher:", error);
    throw error;
  }
};

//get all teachers details 
export const getAllTeachers = async () => {
  try {
    const response = await api.get(`/teachers/getAllTeachers`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all teachers:", error);
    throw error;
  }
};

//remove teacher by id
export const removeTeacherById = async (teacherId) => {
  try {
    const response = await api.delete(`/teachers/removeTeacher/${teacherId}`);
    return response.data;
  } catch (error) {
    console.error("Error removing teacher:", error);
    throw error;
  }
};

export default api;