//import createSlice, createAsyncThunk
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
//import axios
import axios from 'axios';

//this method to fetch all the todos
export const fetchTodoCall = createAsyncThunk('fetchTodoCall', async () => {
  // fetching all todo call to server
  const { data } = await axios.get(
    'https://jsonplaceholder.typicode.com/todos'
  );

  return data;
});

//this method to add a new todo
export const addTodoCall = createAsyncThunk(
  'addTodoCall',
  async (todo, { dispatch }) => {
    const config = {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    };
    try {
      //adding new todo call to server
      const { data } = await axios.post(
        'https://jsonplaceholder.typicode.com/todos',
        todo,
        config
      );

      //dispatch addTodo reducer function with new todo
      dispatch(actions.addTodo(data));
    } catch (error) {
      console.error(error);
    }
  }
);

//this method is to update the todo
export const updateTodoCall = createAsyncThunk(
  'updateTodoCall',
  async (todo, { dispatch }) => {
    //de-structure id from todo
    const { id } = todo;
    const config = {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    };

    try {
      //update a todo call to server
      const { data } = await axios.put(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        todo,
        config
      );

      //dispatch update todo reducer function with the updated todo
      dispatch(actions.updateTodo(data));
    } catch (error) {
      console.error(error);
    }
  }
);

//this method is to delete a todo
export const deleteTodoCall = createAsyncThunk(
  'deleteTodoCall',
  async (todo, { dispatch }) => {
    //de-structure id from todo
    const { id } = todo;

    try {
      //deleting a todo call to server
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);

      //dispatch delete todo reducer function with todo id
      dispatch(actions.deleteTodo(todo));
    } catch (error) {
      console.error(error);
    }
  }
);

//create a todo slice
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

//export todo reducer function
export const todoReducer = todoSlice.reducer;
//export todo actions
export const actions = todoSlice.actions;
