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
  async (todoInfo, { dispatch }) => {
    //de-structure todo and index from todoInfo
    const { todo, index } = todoInfo;
    //de-structure id from todo
    const { id } = todo;
    const config = {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    };

    try {
      //update a todo call to server
      const { data } = await axios.patch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        todo,
        config
      );

      //dispatch update todo reducer function with the updated todo
      dispatch(actions.updateTodo({ data, index }));
    } catch (error) {
      console.error(error);
    }
  }
);

//this method is to delete a todo
export const deleteTodoCall = createAsyncThunk(
  'deleteTodoCall',
  async (todoInfo, { dispatch }) => {
    //de-structure todo and index from todoInfo
    const { todo, index } = todoInfo;
    //de-structure id from todo
    const { id } = todo;

    try {
      //deleting a todo call to server
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);

      //dispatch delete todo reducer function with todo and todo index
      dispatch(actions.deleteTodo({ todo, index }));
    } catch (error) {
      console.error(error);
    }
  }
);

//create a todo slice
const todoSlice = createSlice({
  // todoSlice name
  name: 'todo',
  // initial state
  initialState: {
    loading: true,
    todos: [],
    error: null,
  },
  // all reducers
  reducers: {
    // add todo reducer
    addTodo: (state, action) => {
      const newTodo = action.payload;
      state.todos = [newTodo, ...state.todos];
    },
    // update todo reducer
    updateTodo: (state, action) => {
      const { data: todo, index: todoIndex } = action.payload;
      const existTodo = state.todos.find((x, index) => index === todoIndex);

      if (existTodo) {
        state.todos = state.todos.map((x, index) =>
          index === todoIndex ? todo : x
        );
      } else {
        state.todos = [...state.todos, todo];
      }
    },
    // delete todo reducer
    deleteTodo: (state, action) => {
      const { index: todoIndex } = action.payload;
      state.todos = state.todos.filter((todo, index) => index !== todoIndex);
    },
  },
  // extraReducer to update the todo array in store with the data of fetchTodoCall method
  extraReducers: (builder) => {
    // if fetchTodoCall is pending
    builder.addCase(fetchTodoCall.pending, (state) => {
      state.loading = true;
    });
    // if fetchTodoCall is fulfilled
    builder.addCase(fetchTodoCall.fulfilled, (state, action) => {
      state.loading = false;
      state.todos = action.payload;
    });
    // if fetchTodoCall is rejected
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
