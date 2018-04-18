import axios from "axios";
import cookie from "js-cookie";

export const fetchCards = deckId => {
  return axios.get(`/api/cards?deck=${deckId}`, { headers: { Authorization: cookie.get("token") } });
};

export const fetchCard = cardId => {
  return axios.get(`/api/cards/${cardId}`, { headers: { Authorization: cookie.get("token") } });
};

export const editCard = card => {
  return axios.put(`/api/cards/${card._id}`, card, { headers: { Authorization: cookie.get("token") } });
};

export const createCard = params => {
  return axios.post("/api/cards", params, { headers: { Authorization: cookie.get("token") } });
};

export const deleteCard = cardId => {
  return axios.delete(`/api/cards/${cardId}`, { headers: { Authorization: cookie.get("token") } });
};

export const resetCard = cardId => {
  return axios.delete(`/api/cards/${cardId}/review`, { headers: { Authorization: cookie.get("token") } });
};
