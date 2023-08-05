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
export const getHeroesThunk = createAsyncThunk('heroes/get', async payload => {
  try {
    console.log('getHeroesThunk');
    const gettingData = await httpClient.get('/heroes');
    console.log('gettingData :>> ', gettingData);
  } catch (err) {}
});

const heroesSlice = createSlice({
  name: 'heroes',
  initialState,
  // если локальное изменение состояния или была загрузка сагами, ...
  // reducers:,
  // если загрузка чанками
  // extraReducers:
});

// heroesSlice.reducer - функция, как менять локальное сотояние
export default heroesSlice.reducer;
