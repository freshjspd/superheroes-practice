import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as API from '../../api';

const POWERS_SLICE_NAME = 'powers';

const initialState = {
  powers: [],
  isFetching: false,
  error: null,
};

export const getPowersThunk = createAsyncThunk(
  `${POWERS_SLICE_NAME}/get`,
  async (payload, { rejectWithValue }) => {
    try {
      const {
        data: { data: gettingData },
      } = await API.getPowers();
      return gettingData;
    } catch (err) {
      return rejectWithValue({ message: err.message });
    }
  }
);

const powersSlice = createSlice({
  name: `${POWERS_SLICE_NAME}`,
  initialState,

  extraReducers: builder => {
    // GET

    builder.addCase(getPowersThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });

    builder.addCase(getPowersThunk.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.powers = [...payload];
    });

    builder.addCase(getPowersThunk.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.error = payload;
    });
  },
});

export default powersSlice.reducer;
