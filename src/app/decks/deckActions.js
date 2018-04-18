import axios from "axios";
import cookie from "js-cookie";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

export const fetchDecks = () => {
  return axios.get("/api/decks", { headers: { Authorization: cookie.get("token") } });
};

export const fetchDeck = deckId => {
  return axios.get(`/api/decks/${deckId}`, { headers: { Authorization: cookie.get("token") } });
};

export const editDeck = deck => {
  return axios.put(`/api/decks/${deck._id}`, deck, { headers: { Authorization: cookie.get("token") } });
};

export const createDeck = params => {
  return axios.post("/api/decks", params, { headers: { Authorization: cookie.get("token") } });
};

export const resetDeck = deckId => {
  return axios.delete(`/api/decks/${deckId}/review`, { headers: { Authorization: cookie.get("token") } });
};

export const studyDeck = deckId => {
  return axios.post(`/api/sessions`, { deck: deckId, type: "deck" }, { headers: { Authorization: cookie.get("token") } });
};

export const deleteDeck = deckId => {
  return axios.delete(`/api/decks/${deckId}`, { headers: { Authorization: cookie.get("token") } });
};
