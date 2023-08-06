import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'http://localhost:5001/api',
});

const initialState = {
  heroes: [],
  isFetching: false,
  error: null,
};

// getHeroesThunk() => {type: 'heroes/get'}
export const getHeroesThunk = createAsyncThunk(
  'heroes/get',
  async (payload, { rejectWithValue }) => {
    try {
      const gettingData = await httpClient.get('/heroes');
      return gettingData.data.data; //=> action.payload
    } catch (err) {
      // err - plain object
      return rejectWithValue({ message: err.message }); //=> action.payload
    }
  }
);

const heroesSlice = createSlice({
  name: 'heroes',
  initialState,
  // если локальное изменение состояния или была загрузка сагами, ...
  // reducers: (state, action) => state,
  // если загрузка чанками
  extraReducers: builder => {
    // GET
    // builder.addCase('heroes/get/pending', );
    builder.addCase(getHeroesThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });

    builder.addCase(getHeroesThunk.fulfilled, (state, action) => {
      state.isFetching = false;
      state.heroes = [...action.payload];
    });

    builder.addCase(getHeroesThunk.rejected, (state, acton) => {
      state.isFetching = false;
      state.error = acton.payload;
    });
  },
});

// heroesSlice.reducer - функция, как менять локальное сотояние
export default heroesSlice.reducer;
