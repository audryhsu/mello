import axios from 'axios';
import * as routes from '../constants/ApiRoutes';

function logError(errorResponse) {
  const response = errorResponse.response;

  if (response && response.data && response.data.error) {
    console.error(`HTTP Error: ${response.data.error}`);
  } else {
    console.error('Error: ', errorResponse);
  }
}

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Accept'] = 'application/json';

const apiClient = {
  getBoards: async () => {
    try {
      const { data } = await axios.get(routes.BOARDS_INDEX_URL);
      return data;
    } catch (e) {
      logError(e);
    }
  },
  createBoard: async (board) => {
    try {
      const { data } = await axios.post(routes.CREATE_BOARD_URL, { board });
      return data;
    } catch (e) {
      logError(e);
    }
  },
  getBoard: async (id) => {
    try {
      const { data } = await axios.get(`${routes.CREATE_BOARD_URL}/${id}`);
      return data;
    } catch (e) {
      logError(e);
    }
  },
  createList: async (list) => {
    try {
      const { data } = await axios.post(routes.CREATE_LIST_URL, list);
      return data;
    } catch (err) {
      logError(err);
    }
  },
  editList: async (list) => {
    try {
      const { data } = await axios.put(
        `${routes.EDIT_LIST_URL}/${list._id}`,
        list
      );
      return data;
    } catch (err) {
      logError(err);
    }
  },
  createCard: async (newCardPayload) => {
    try {
      const { data } = await axios.post(routes.CREATE_CARD_URL, newCardPayload);
      return data;
    } catch (err) {
      logError(err);
    }
  },
  editCard: async (cardId, updatedCard) => {
    try {
      const { data } = await axios.put(`${routes.EDIT_CARD_URL}/${cardId}`, updatedCard);
      return data;
    } catch (err) {
      logError(err);
    }
  },
  fetchCard: async (cardId) => {
    try {
      const { data } = await axios.get(`${routes.EDIT_CARD_URL}/${cardId}`);
      return data;
    } catch (err) {
      logError(err);
    }
  },
};

export default apiClient;
