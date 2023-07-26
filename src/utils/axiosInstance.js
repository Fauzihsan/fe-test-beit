import axios from "axios";

const instance = axios.create({
  baseURL: "http://ecocim-backend-theone.beit.co.id/api/ManualConfig",
});

export default instance;
