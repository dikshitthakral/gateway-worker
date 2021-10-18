import axios from "axios";
import config from "../config";

export const simulatorHttpClient = axios.create({
    baseURL: config.SIMULATOR_BASE_URL,
    timeout: 20000,
    headers: {}
});