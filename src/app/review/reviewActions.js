import axios from "axios";
import cookie from "js-cookie";

export const fetchSession = sessionId => {
  return axios.get(`/api/sessions/${sessionId}`, { headers: { Authorization: cookie.get("token") } });
};

export const reviewCard = ({ cardId, value }) => {
  return axios.post(`/api/cards/${cardId}/review`, { cardId, value }, { headers: { Authorization: cookie.get("token") } });
};

export const createSession = (sessionType, deckId) => {
  return axios.post("/api/sessions", { type: sessionType, deck: deckId }, { headers: { Authorization: cookie.get("token") } });
};
