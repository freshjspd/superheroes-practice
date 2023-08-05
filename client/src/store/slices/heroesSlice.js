import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  heroes: [],
  isFetching: false,
  error: null,
};

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
