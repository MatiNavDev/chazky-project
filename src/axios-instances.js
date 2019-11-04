import axios from "axios";

const baseUrl = process.env.NODE_ENV
  ? "http://localhost:3007/chasky-project-api/v1/"
  : "https://chasky-app-server.herokuapp.com/chasky-project-api/v1/";

const axiosUsers = axios.create({
  baseURL: baseUrl + "users/"
});

const axiosVehicles = axios.create({
  baseURL: baseUrl + "vehicles/"
});

const axiosRequeriments = axios.create({
  baseURL: baseUrl + "requeriments/"
});

export { axiosUsers, axiosVehicles, axiosRequeriments };
