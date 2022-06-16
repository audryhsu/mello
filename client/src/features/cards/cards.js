import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../lib/ApiClient';

const initialState = [];

export const fetchCards = createAsyncThunk('cards/fetchCards',
  async (Ids) => {
    const {boardId, listId} = Ids
    const board = await apiClient.getBoard(boardId);
    const parentList = board.lists.find(({_id}) => {
      return listId === _id
    })
    return parentList.cards;
  });

// export const createCard = createAsyncThunk(
//   'cards/createCard',
//   async (newCard, callback) => {
//     const data = await apiClient.createCard(newCard);
//     if (callback) {
//       callback;
//     }
//     return data;
//   }
// );

// export const fetchCard = createAsyncThunk('cards/fetchCard', async (id) => {
//   const data = await apiClient.getCard(id);
//   console.log('data', data);
//   return data;
// });

const cardSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCards.fulfilled, (state, action) => {
      return state.concat(action.payload)
    })
    //   builder.addCase(createCard.fulfilled, (state, action) => {
    //     state.push(action.payload);
    //   });
    // // fetching a card object that contains cards and cards properties
    // builder.addCase(fetchCard.fulfilled, (state, action) => {
    //   const cardsLessNewCard = state.filter(
    //     (b) => b._id !== action.payload._id
    //   );
    //   // console.log('fetch card builder', cardsLessNewCard, action.payload);
    //   return [...cardsLessNewCard, action.payload];
    // });
  }
});

export default cardSlice.reducer;
