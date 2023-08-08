import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as API from '../../api';

const HEROES_SLICE_NAME = 'heroes';

const initialState = {
  heroes: [],
  isFetching: false,
  error: null,
};

export const createHeroThunk = createAsyncThunk(
  `${HEROES_SLICE_NAME}/create`,
  async (payload, { rejectWithValue }) => {
    try {
      const {
        data: { data: createdUser },
      } = await API.createHero(payload);

      return createdUser;
    } catch (err) {
      return rejectWithValue({ message: err.message });
    }
  }
);

// getHeroesThunk() => {type: 'heroes/get'}
export const getHeroesThunk = createAsyncThunk(
  `${HEROES_SLICE_NAME}/get`,
  async (payload, { rejectWithValue }) => {
    try {
      const {
        data: { data: gettingData },
      } = await API.getHeroes();
      return gettingData; //=> action.payload
    } catch (err) {
      // err - plain object
      return rejectWithValue({ message: err.message }); //=> action.payload
    }
  }
);

// PATCH /api/heroes/id body
export const updateHeroThunk = createAsyncThunk(
  `${HEROES_SLICE_NAME}/update`,
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const {
        data: { data: updatedHero },
      } = await API.updateHero(id, updatedData);
      return updatedHero;
    } catch (err) {
      return rejectWithValue({ message: err.message });
    }
  }
);

// DELETE /api/heroes/id
export const deleteHeroThunk = createAsyncThunk(
  `${HEROES_SLICE_NAME}/delete`,
  async (payload, { rejectWithValue }) => {
    // id
    try {
      await API.deleteHero(payload);
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
    // POST
    builder.addCase(createHeroThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(createHeroThunk.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.heroes.push(payload);
    });
    builder.addCase(createHeroThunk.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.error = payload;
    });

    // GET
    // builder.addCase('heroes/get/pending', );
    builder.addCase(getHeroesThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });

    builder.addCase(getHeroesThunk.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.heroes = [...payload];
    });

    builder.addCase(getHeroesThunk.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.error = payload;
    });

    // PATCH
    builder.addCase(updateHeroThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });

    builder.addCase(updateHeroThunk.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      const updatedHeroIndex = state.heroes.findIndex(h => h.id === payload.id);

      state.heroes[updatedHeroIndex] = { ...payload };
    });

    builder.addCase(updateHeroThunk.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.error = payload;
    });

    // DELETE
    builder.addCase(deleteHeroThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });

    builder.addCase(deleteHeroThunk.fulfilled, (state, { payload }) => {
      const deletedHeroIndex = state.heroes.findIndex(h => h.id === payload);
      state.heroes.splice(deletedHeroIndex, 1);
      state.isFetching = false;
    });

    builder.addCase(deleteHeroThunk.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.error = payload;
    });
  },
});

// heroesSlice.reducer - функция, как менять локальное сотояние
export default heroesSlice.reducer;
