import axios from "axios";

const USERS_API_BASE_URL = 'http://localhost:8080/api/users';
const HOSPITAL_API_BASE_URL = 'http://localhost:8080/api/hospital';
const AUTH_API_BASE_URL = 'http://localhost:8080/api/auth';

// User-related requests
export const listUsers = () => axios.get(USERS_API_BASE_URL);
export const createUser = (user) => axios.post(USERS_API_BASE_URL, user);
export const getUser = (userId) => axios.get(`${USERS_API_BASE_URL}/${userId}`);
export const updateUser = (userId, user) => axios.put(`${USERS_API_BASE_URL}/${userId}`, user);
export const deleteUser = (userId) => axios.delete(`${USERS_API_BASE_URL}/${userId}`);

// Hospital-related requests
export const listHospitals = () => axios.get(HOSPITAL_API_BASE_URL);
export const createHospital = (hospital) => axios.post(HOSPITAL_API_BASE_URL, hospital);
export const getHospital = (hospitalId) => axios.get(`${HOSPITAL_API_BASE_URL}/${hospitalId}`);
export const updateHospital = (hospitalId, hospital) => axios.put(`${HOSPITAL_API_BASE_URL}/${hospitalId}`, hospital);
export const deleteHospital = (hospitalId) => axios.delete(`${HOSPITAL_API_BASE_URL}/${hospitalId}`);

// Authentication-related requests
export const login = (loginRequest) => axios.post(`${AUTH_API_BASE_URL}/login`, loginRequest);
export const register = (registerRequest) => axios.post(`${AUTH_API_BASE_URL}/register`, registerRequest);

// Blood type-related requests
export const addBloodType = (hospitalId, bloodTypes) => axios.post(`${HOSPITAL_API_BASE_URL}/${hospitalId}/blood-types`, bloodTypes);
export const updateBloodType = (hospitalId, bloodTypes) => axios.put(`${HOSPITAL_API_BASE_URL}/${hospitalId}/blood-types`, bloodTypes);
export const removeBloodType = (hospitalId, bloodType) => axios.delete(`${HOSPITAL_API_BASE_URL}/${hospitalId}/blood-types/${bloodType}`);

// Function to check if an email exists
export const checkEmailExists = async (email) => {
  try {
    const response = await axios.get(`${USERS_API_BASE_URL}/exists`, {
      params: { email },
    });
    return response.data.exists;
  } catch (error) {
    console.error("Error checking email existence:", error.response ? error.response.data : error.message);
    return false;
  }
};