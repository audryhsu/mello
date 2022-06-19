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
      // list objects only contain title -- don't contain lists
      const lists = action.payload.lists.reduce((acc, list) => {
        //eslint-disable-next-line
        const { cards, ...listWithoutCards } = list;

        return acc.concat(listWithoutCards);
      }, []);
      return lists
    })

    builder.addCase(createList.fulfilled, (state, action) => {
      state.push(action.payload);
    });

    builder.addCase(editList.fulfilled, (state, action) => {
      const listsLessNewList = state.filter(list => list._id !== action.payload._id)
      return [...listsLessNewList, action.payload]
    })
  }
});

export default listSlice.reducer;
