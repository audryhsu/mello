import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../lib/ApiClient';

const initialState = [];

export const fetchBoards = createAsyncThunk('boards/fetchBoards', async () => {
  const data = await apiClient.getBoards();
  return data;
});

export const createBoard = createAsyncThunk(
  'boards/createBoard',
  async (newBoard, callback) => {
    const data = await apiClient.createBoard(newBoard);
    if (callback) {
      callback;
    }
    return data;
  }
);

export const fetchBoard = createAsyncThunk('boards/fetchBoard', async (id) => {
  const data = await apiClient.getBoard(id);
  console.log('data', data);
  return data;
});

const boardSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoards.fulfilled, (state, action) => {
      // board objects only contain title -- don't contain lists
      return action.payload.reduce((acc, comm) => {
        //eslint-disable-next-line
        const { lists, ...boardWithoutLists } = comm;
        return acc.concat(boardWithoutLists);
      }, []);
    }),
      builder.addCase(createBoard.fulfilled, (state, action) => {
        state.push(action.payload);
      });
    // fetching a board object that contains lists and cards properties
    builder.addCase(fetchBoard.fulfilled, (state, action) => {
      const boardsLessNewBoard = state.filter(
        (b) => b._id !== action.payload._id
      );
      // console.log('fetch board builder', boardsLessNewBoard, action.payload);
      return [...boardsLessNewBoard, action.payload];
    });
  },
});

export default boardSlice.reducer;
