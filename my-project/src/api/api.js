import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
});

// Function to Set Authorization Header Dynamically
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
    console.log("Authorization token set:", token);
  } else {
    delete api.defaults.headers.Authorization;
    console.log("Authorization token removed");
  }
};

//get teacher details
export const fetchTeacherInfo = async () => {
  try{
    const response = await api.get(`/teachers/getTeacher`);
    return response.data.data.teacherRegistrationId;
  }
  catch(error){
    console.log("Error in fetching teacher info",error);
    return  { teacherRegistrationId: null };
  }
}
//get teacher details
export const fetchTeacherLeave = async () => {
  try{
    const response = await api.get(`/teachers/getTeacher`);
    console.log("response",response.data.data.leave);
    return response.data.data.leave;
  }
  catch(error){
    console.log("Error in fetching teacher info",error);
    return  { teacherRegistrationId: null };
  }
}


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
    const response = await api.post(`/leaveApplication/apply`, formData);
    return response.data;
  } catch (error) {
    handleApiError(error, "submitLeaveApplication");
    return { status: "Failed"};
  }
};

//get alternate arrangements
export const getAlternateArrangements = async () => {
  try{
    const response = await api.get(`/inbox/getAllPendingMessages`);
    console.log(response);
    return response.data;
  }
  catch(error){
    console.log("No Alternate Arrangments",error);
    return { data : [] }
  }
}

//accept substitute request
export const acceptSubstituteRequest = async (id) => {
  try{
    const response = await api.put(`/inbox/acceptRequest/${id}`);
    console.log(response);
    return response.data;
  }
  catch(error){
    console.log("Acception failed",error);
    return {status: "Failed" }
  }
}

//reject substitute request
export const rejectSubstituteRequest = async (id) => {
  try{
    const response = await api.post(`/inbox/update-status/${id}`, {
      status: "REJECTED" ,
    });
    console.log(response);
    return response.data;
  }
  catch(error){
    console.log("Rejection Failed",error);
    return {status: "Failed" }
  }
}

//Get leave history
export const getLeaveHistory = async () => {
  try{
    const response = await api.get(`/leaveApplication`);
    console.log(response);
    return response.data;
  }
  catch(error){
    console.log("No Alternate Arrangments",error);
    return { data : [] }
  }
}

// Fetch leave details by ID
export const getLeaveDetails = async (leaveId) => {
  try {
    const response = await api.get(`/leaveApplication/leaveId/${leaveId}`);
    return response;
  } catch (error) {
    throw error;
  }
}

//upload file
export const uploadFile = async (fileData) => {
  try {
    const response = await api.post(`/images/upload`, fileData, {
      headers: {
        "Content-Type": "form-data",
      },
    });
    console.log("File uploaded successfully:", response);
    return response;
  } catch (error) {
    handleApiError(error, "uploadFile");
    return { status: "Failed" };
  }
};

// Error Handling Function
const handleApiError = (error, functionName) => {
  if (axios.isAxiosError(error)) {
    console.error(` API Error in ${functionName}:`, error.message);
    if (error.response) {
      console.error(" Server Response:", error.response.status, error.response.data);
    } else if (error.request) {
      console.error(" No response received from server");
    } else {
      console.error(" Request setup error:", error.message);
    }
  } else {
    console.error(`Unexpected error in ${functionName}:`, error);
  }
};

export default api;
