

import axios from "axios";

export const api = axios.create({
    baseURL: "https://json-server-pet-star.vercel.app" // => localhost:3000
})