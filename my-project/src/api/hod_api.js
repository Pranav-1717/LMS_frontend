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

//get all pending requests
export const fetchPendingRequests = async () => {
  try {
    const response = await api.get(`/HOD/pendingLeaves`);
    return response.data;
  } catch (error) {
    console.error("Error fetching pending requests:", error);
    return { data: [] };
  }
};



//get request by id
export const fetchRequestById = async (id) => {
  try {
    const response = await api.get(`/HOD/pendingLeavesById/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching request by id:", error);
    return { data: {} };
  }
};

//get approved requests
export const fetchApprovedRequests = async () => {
  try {
    const response = await api.get(`/HOD/acceptedLeave`);
    console.log("Response from fetchApprovedRequests:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching approved requests:", error);
    return { data: [] };
  }
};

//get rejected requests
export const fetchRejectedRequests = async () => {
  try {
    const response = await api.get(`/HOD/rejectedLeave`);
    console.log("Response from fetchRejectedRequests:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching rejected requests:", error);
    return { data: [] };
  }
};

//get all accepted applications by id
export const fetchAcceptedApplicationsById = async (id) => {
  try {
    const response = await api.get(`/HOD/acceptedLeave/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching accepted applications by id:", error);
    return { data: [] };
  }
};

//get all rejected applications by id
export const fetchRejectedApplicationsById = async (id) => {
  try {
    const response = await api.get(`/HOD/rejectedLeave/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching rejected applications by id:", error);
    return { data: [] };
  }
};

//accept application
export const acceptApplication = async (id) => {
  try {
    const response = await api.post(`/HOD/acceptLeaveApplication/${id}`);
    console.log("Response from acceptApplication:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error accepting application:", error);
    return { status: "Failed" };
  }
};

//reject application
export const rejectApplication = async (id) => {
  try {
    const response = await api.post(`/HOD/rejectLeaveApplication/${id}`);
    console.log("Response from rejectApplication:", response.data);
    if (response.status !== 200) {
      throw new Error("Failed to reject application");
    }
    return response.data;
  } catch (error) {
    console.error("Error rejecting application:", error);
    return { status: "Failed" };
  }
};

//get all applications
export const fetchAllApplications = async () => {
  try {
    const response = await api.get(`/leaveApplication/all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all applications:", error);
    return { data: [] };
  }
};
