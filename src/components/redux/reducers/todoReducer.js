import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTodoCall = createAsyncThunk('fetchTodoCall', async () => {
  const { data } = await axios.get(
    'https://jsonplaceholder.typicode.com/posts'
  );

  return data;
});

export const addTodoCall = createAsyncThunk(
  'addTodoCall',
  async (todo, { dispatch }) => {
    const config = {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    };
    try {
      const { data } = await axios.post(
        'https://jsonplaceholder.typicode.com/posts',
        todo,
        config
      );
    } catch (error) {
      console.error(error);
    }
  }
);

export const updateTodoCall = createAsyncThunk(
  'updateTodoCall',
  async (todo, { dispatch }) => {
    const { id } = todo;
    config = {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    };

    try {
      const { data } = await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        todo,
        config
      );
    } catch (error) {
      console.error(error);
    }
  }
);

export const deleteTodoCall = createAsyncThunk(
  'deleteTodoCall',
  async (todo, { dispatch }) => {
    const { id } = todo;
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    } catch (error) {
      console.error(error);
    }
  }
);

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    loading: true,
    todos: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTodo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTodo.fulfilled, (state, action) => {
      state.loading = false;
      state.todos = action.payload;
    });
    builder.addCase(fetchTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.response;
    });
  },
});

export const todoReducer = todoSlice.reducer;
