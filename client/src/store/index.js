import { configureStore } from '@reduxjs/toolkit';
import heroesReducer from './slices/heroesSlice';

// reducer - функция, как метнять общее состояние
const reducer = {
  heroData: heroesReducer,
  // powersData: powersReducer,
};

const store = configureStore({ reducer });

export default store;

//  state ={
//   heroData: {
//     heroes: [],
//     isFetching: false,
//     error: null,
//   },
// powersData: {
//     powers: [],
//     isFetching: false,
//     error: null,
//   }
// };
