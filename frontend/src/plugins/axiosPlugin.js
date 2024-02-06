import axios from "axios";

const BASE_URL = "http://127.0.0.1:5000/api/";

export const backend = axios.create({ baseURL: BASE_URL });
