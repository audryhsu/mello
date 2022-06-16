import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../lib/ApiClient';
import { fetchBoard } from '../boards/boards';

const initialState = [];

export const createList = createAsyncThunk(
  'lists/createList',
  async (args) => {
    const {list, callback} = args
    const data = await apiClient.createList(list);
    if (callback) {
      callback();
    }
    return data;
  }
);

export const editList = createAsyncThunk(
  'lists/editList',
  async (args) => {
    const {list, callback} = args
    const data = await apiClient.editList(list);
    if (callback) {
      callback();
    }
    return data;
  }
)

const listSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoard.fulfilled, (state, action) => {
      console.log("board", action.payload)
      // list objects only contain title -- don't contain lists
      const lists = action.payload.lists.reduce((acc, list) => {
        //eslint-disable-next-line
        const { cards, ...listWithoutCards } = list;

        return acc.concat(listWithoutCards);
      }, []);
      console.log("lists", lists)
      return lists
    })

    builder.addCase(createList.fulfilled, (state, action) => {
      state.push(action.payload);
    });
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
