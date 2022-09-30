import { createSlice } from '@reduxjs/toolkit';
import dataService from '../services/data.service';

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    dataRequested: (state) => {
      state.isLoading = true;
    },
    dataReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    dataRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: dataReducer, actions } = dataSlice;
const { dataRequested, dataReceived, dataRequestFailed } = actions;

export const loadDataList = () => async (dispatch) => {
  dispatch(dataRequested());
  try {
    const { content } = await dataService.get();
    dispatch(dataReceived(content));
  } catch (error) {
    dispatch(dataRequestFailed(error.message));
  }
};

export const getData = () => (state) => state.data.entities;
export const getDataLoadingStatus = () => (state) => state.data.isLoading;

export default dataReducer;
