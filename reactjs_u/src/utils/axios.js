import axios from "axios";

const tokens = localStorage.getItem("app-user-token");
const token = tokens && JSON.parse(tokens).accessToken;
// axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.headers.common = { Authorization: `bearer ${token}` };
export default axios;
