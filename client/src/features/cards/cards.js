import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../lib/ApiClient';
import { fetchBoard } from '../boards/boards';

const initialState = [];

export const createCard = createAsyncThunk('cards/createCard', async (args) => {
  const { newCardPayload, callback } = args;
  const data = await apiClient.createCard(newCardPayload);
  if (callback) {
    callback();
  }
  return data;
});

export const editCard = createAsyncThunk('cards/editCard', async (args) => {
  const { updatedCard, callback } = args;
})


const cardSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoard.fulfilled, (state, action) => {
      const newCards = action.payload.lists.reduce((acc, list) => {
        return acc.concat(list.cards);
      }, []);

      // filter out cards from card state for this particular board
      const stateLessNewCards = state.filter(
        (card) => card.boardId !== action.payload._id
      );
      return [...stateLessNewCards, ...newCards];
    });
      builder.addCase(createCard.fulfilled, (state, action) => {
        state.push(action.payload);
      });

  },
});

export default cardSlice.reducer;
