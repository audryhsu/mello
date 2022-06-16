import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../lib/ApiClient';

const initialState = [];

export const fetchLists = createAsyncThunk('lists/fetchLists',
  async (boardId) => {
    const board = await apiClient.getBoard(boardId);
    return board.lists;
  });

// export const createList = createAsyncThunk(
//   'lists/createList',
//   async (newList, callback) => {
//     const data = await apiClient.createList(newList);
//     if (callback) {
//       callback;
//     }
//     return data;
//   }
// );

// export const fetchList = createAsyncThunk('lists/fetchList', async (id) => {
//   const data = await apiClient.getList(id);
//   console.log('data', data);
//   return data;
// });

const listSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLists.fulfilled, (state, action) => {
      // list objects only contain title -- don't contain lists
      const lists = action.payload.reduce((acc, list) => {
        //eslint-disable-next-line
        const { cards, ...listWithoutCards } = list;

        return acc.concat(listWithoutCards);
      }, []);
      return lists
    })
    //   builder.addCase(createList.fulfilled, (state, action) => {
    //     state.push(action.payload);
    //   });
    // // fetching a list object that contains lists and cards properties
    // builder.addCase(fetchList.fulfilled, (state, action) => {
    //   const listsLessNewList = state.filter(
    //     (b) => b._id !== action.payload._id
    //   );
    //   // console.log('fetch list builder', listsLessNewList, action.payload);
    //   return [...listsLessNewList, action.payload];
    // });
  }
});

export default listSlice.reducer;
