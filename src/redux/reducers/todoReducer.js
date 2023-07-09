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
      dispatch(actions.addTodo(data));
    } catch (error) {
      console.error(error);
    }
  }
);

export const updateTodoCall = createAsyncThunk(
  'updateTodoCall',
  async (todo, { dispatch }) => {
    const { id } = todo;
    const config = {
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
      dispatch(actions.updateTodo(data));
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
      dispatch(actions.deleteTodo(todo));
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
  reducers: {
    addTodo: (state, action) => {
      const newTodo = action.payload;
      state.todos = [newTodo, ...state.todos];
    },
    updateTodo: (state, action) => {
      const todo = action.payload;
      const existTodo = state.todos.find((x) => x.id === todo.id);

      if (existTodo) {
        state.todos = state.todos.map((x) =>
          x.id === existTodo.id ? todo : x
        );
      } else {
        state.todos = [...state.todos, todo];
      }
    },
    deleteTodo: (state, action) => {
      const deletedTodo = action.payload;
      state.todos = state.todos.filter((todo) => todo.id !== deletedTodo.id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodoCall.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTodoCall.fulfilled, (state, action) => {
      state.loading = false;
      state.todos = action.payload;
    });
    builder.addCase(fetchTodoCall.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.response;
    });
  },
});

export const todoReducer = todoSlice.reducer;
export const actions = todoSlice.actions;
