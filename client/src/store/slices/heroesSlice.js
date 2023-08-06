import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'http://localhost:5001/api',
});

const HEROES_SLICE_NAME = 'heroes';

const initialState = {
  heroes: [],
  isFetching: false,
  error: null,
};

// getHeroesThunk() => {type: 'heroes/get'}
export const getHeroesThunk = createAsyncThunk(
  `${HEROES_SLICE_NAME}/get`,
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

// DELETE /api/heroes/id
export const deleteHeroThunk = createAsyncThunk(
  `${HEROES_SLICE_NAME}/delete`,
  async (payload, rejectWithValue) => {
    // id
    try {
      await httpClient.delete(`/heroes/${payload}`);
      return payload;
    } catch (err) {
      return rejectWithValue({ message: err.message });
    }
  }
);

const heroesSlice = createSlice({
  name: `${HEROES_SLICE_NAME}`,
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

    // DELETE
    builder.addCase(deleteHeroThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });

    builder.addCase(deleteHeroThunk.fulfilled, (state, action) => {
      const deletedHeroIndex = state.heroes.findIndex(
        h => h.id === action.payload
      );
      state.heroes.splice(deletedHeroIndex, 1);
      state.isFetching = false;
    });

    builder.addCase(deleteHeroThunk.rejected, (state, acton) => {
      state.isFetching = false;
      state.error = acton.payload;
    });
  },
});

// heroesSlice.reducer - функция, как менять локальное сотояние
export default heroesSlice.reducer;
