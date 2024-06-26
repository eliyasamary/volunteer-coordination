import axios from "axios";

const baseURL = "https://volunteer-coordinator.onrender.com";

export const http = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-type": "application/json",
  },
});

const loginUser = async (email, password) => {
  try {
    const response = await http.post("/api/v1/users/login", {
      email: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.error("An error occurred while fetching data / signin", error);
  }
};

const signupUser = async (data) => {
  try {
    const response = await http.post("/api/v1/users/signup", data);
    return response.data;
  } catch (error) {
    console.error("An error occurred while fetching data / signup", error);
  }
};

const updateUser = async (id, data) => {
  try {
    const response = await http.patch("/api/v1/volunteer-persons/" + id, data);
    return response.data;
  } catch (error) {
    console.error("An error occurred while fetching data / update user", error);
  }
};

const updateTask = async (id, data) => {
  try {
    const response = await http.patch("/api/v1/volunteer-tasks/" + id, data);
    return response.data;
  } catch (error) {
    console.error("An error occurred while fetching data / update task", error);
  }
};

const getUser = async (id) => {
  try {
    const response = await http.get("/api/v1/volunteer-persons/" + id);
    return response;
  } catch (error) {
    console.error(
      "An error occurred while fetching data / get user " + id,
      error
    );
  }
};

const getAllLocations = async () => {
  try {
    const response = await http.get("/api/v1/locations");
    return response;
  } catch (error) {
    console.error(
      "An error occurred while fetching data / all locations",
      error
    );
  }
};

const getAllSkills = async () => {
  try {
    const response = await http.get("/api/v1/skills");
    return response;
  } catch (error) {
    console.error("An error occurred while fetching data / all skills", error);
  }
};

const getAllTasks = async () => {
  try {
    const response = await http.get("/api/v1/volunteer-tasks/");
    return response;
  } catch (error) {
    console.error("An error occurred while fetching data / all tasks", error);
  }
};

const getTask = async (id) => {
  try {
    const response = await http.get("/api/v1/volunteer-tasks/" + id);
    return response;
  } catch (error) {
    console.error(
      "An error occurred while fetching data / get task " + id,
      error
    );
  }
};

const getRecommendations = async (id) => {
  try {
    const response = await http.get(
      "api/v1/volunteer-tasks/recommendations/" + id
    );
    return response.data;
  } catch (error) {
    console.error(
      "An error occurred while fetching data / get task recs " + id,
      error
    );
  }
};

export {
  loginUser,
  signupUser,
  getAllLocations,
  getAllSkills,
  getAllTasks,
  getTask,
  updateUser,
  updateTask,
  getUser,
  getRecommendations
};
