//import configureStore
import { configureStore } from '@reduxjs/toolkit';
//import todoReducer
import { todoReducer } from './reducers/todoReducer';

//creating the store
const store = configureStore({
  reducer: {
    todoReducer,
  },
});

//export store
export default store;
