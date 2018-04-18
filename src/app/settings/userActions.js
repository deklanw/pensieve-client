import axios from "axios";
import cookie from "js-cookie";

export const fetchUser = () => {
  return axios.get("/api/users/profile", { headers: { Authorization: cookie.get("token") } });
};

export const editUser = user => {
  return axios.put("/api/users/profile", user, { headers: { Authorization: cookie.get("token") } });
};

export const deleteUser = () => {
  return axios.delete("/api/users/profile", { headers: { Authorization: cookie.get("token") } });
};

export const updatePassword = body => {
  return axios.put("/api/users/profile/security", body, { headers: { Authorization: cookie.get("token") } });
};
