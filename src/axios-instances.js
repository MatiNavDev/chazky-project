import axios from "axios";

const baseUrl =
  "https://chasky-app-server.herokuapp.com/chasky-project-api/v1/";

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
