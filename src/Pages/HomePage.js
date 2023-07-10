//import react, useState, useEffect
import React, { useEffect, useState } from 'react';
//import useDispatch, useSelector
import { useDispatch, useSelector } from 'react-redux';
//import toast for notification
import { toast } from 'react-toastify';
//import Container, Form, Button, Row, Col, Card
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
//import Loader component
import Loader from '../components/Loader';
//import fetchTodoCall, deleteTodoCall, updateTodoCall, addTodoCall
import {
  fetchTodoCall,
  deleteTodoCall,
  updateTodoCall,
  addTodoCall,
} from '../redux/reducers/todoReducer';

//create react funtional component HomePage
const HomePage = () => {
  //this hook is use to set todo title with empty string
  const [todoTitle, setTodoTitle] = useState('');
  //this hook is use to set todo id with null value
  const [todoId, setTodoId] = useState(null);

  //getting todo reducer state from store using useSelector
  const todoDetails = useSelector((state) => state.todoReducer);

  //de-structure loading and todos from the store's state
  const { loading, todos } = todoDetails;

  //useDispatch is used to dispatch actions
  const dispatch = useDispatch();

  //useEffect() allows to perform side effects in components
  useEffect(() => {
    //if todos array is empty
    if (todos.length === 0) {
      //dispatch fetch todo call method
      dispatch(fetchTodoCall());
    }
    //array of dependencies
  }, [dispatch, todos]);

  //delete handler method to delete a todo
  const deleteHandler = (todo) => {
    //if todo is not completed
    if (!todo.Completed) {
      //if todo is not completed, then asking confirmation to delete todo without mark complete
      if (window.confirm('Task is not completed yet. Are you sure ?')) {
        //if yes, then disptach delete todo call with the todo
        dispatch(deleteTodoCall(todo));
        //notifiy that todo is deleted
        toast.error('Task deleted successfully');
      }
    } else {
      //if todo is already marked complete, dispatch delete todo call method
      dispatch(deleteTodoCall(todo));
      //notify that todo is deleted
      toast.error('Task deleted successfully');
    }
  };

  //edit handler method to edit a todo
  const editHandler = (todo) => {
    //set todo id with the passed todo id
    setTodoId(todo.id);
    //set todo title with the passed todo title
    setTodoTitle(todo.title);
    //window scroll to top of the page
    window.scrollTo(0, 0);
  };

  //update handler to update the todo with the edited todo
  const updateHandler = () => {
    //once user make changes to the todo, then on clicked the update button dispatch update todo call method
    dispatch(
      updateTodoCall({
        id: todoId,
        title: todoTitle,
        Completed: false,
        userId: 1,
      })
    );

    //notify the todo is updated
    toast.success('Task update successfully');

    // set todo title to empty string
    setTodoTitle('');
    //set todo id to null
    setTodoId(null);
  };

  //add handler method is to add a new todo
  const addHandler = () => {
    //once user enter the new todo title and clicked to the add button, dispatch add todo call method with default completed to false and userId to 1
    dispatch(
      addTodoCall({
        title: todoTitle,
        Completed: false,
        userId: 1,
      })
    );

    //notify todo is added
    toast.success('Task added successfully');

    //set todo title to empty string
    setTodoTitle('');
    //set todo id to null
    setTodoId(null);
  };

  //toggle handler method to mark todo complete and not complete
  const toggleHandler = (todo) => {
    //if todo is not completed
    if (!todo.Completed) {
      //notify todo is completed
      toast.success('Congrats!!! Task completed');
    }

    //when user marked todo to completed or not completed on clicking the toggle button, dispatch update todo call method
    dispatch(
      updateTodoCall({
        id: todo.id,
        title: todo.title,
        Completed: !todo.Completed,
        userId: 1,
      })
    );
  };

  //this is the UI of the project
  return loading ? (
    <Loader />
  ) : (
    <Container>
      <Row className='mb-1'>
        <Col>
          {/* this form is for add a new todo and update an existing todo */}
          <Form className='d-flex flex-row justify-content-center align-items-center'>
            <Form.Control
              type='text'
              placeholder='Enter the todo title'
              className='bg-black text-white fw-bolder me-1'
              aria-label='Text'
              value={todoTitle}
              style={{ maxWidth: '1200px', minHeight: '45px' }}
              onChange={(e) => setTodoTitle(e.target.value)}
            />
            {todoId ? (
              // if todoId is exist then, display Update Button
              <Button
                variant='success'
                className='fw-bolder'
                style={{ minWidth: '100px' }}
                onClick={updateHandler}
              >
                Update
              </Button>
            ) : (
              // if todoId is null, then it is a new todo hence display Add Button
              <Button
                variant='success'
                className='fw-bolder'
                style={{ minWidth: '100px' }}
                onClick={addHandler}
              >
                Add
              </Button>
            )}
          </Form>
        </Col>
      </Row>
      <Row>
        <div className='text-center fs-1 fw-bolder'>ALL YOUR TASKS</div>
        <div className='d-flex flex-wrap flex-row justify-content-evenly'>
          {/* iterating the todos array and displaying all the todos*/}
          {todos.map((todo) =>
            //  if todo is not completed, then display below card with todo details
            !todo.Completed ? (
              <Card key={todo.id} className='mb-3' style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title className='text-success'>{todo.title}</Card.Title>
                </Card.Body>
                <div className='m-3 d-flex flex-wrap'>
                  {/* edit button */}
                  <Button
                    className='me-3'
                    variant='primary'
                    onClick={() => {
                      editHandler(todo);
                    }}
                  >
                    <i className='fa-solid fa-pen-to-square'></i>
                  </Button>
                  {/* delete button */}
                  <Button
                    className='me-3'
                    variant='primary'
                    onClick={() => deleteHandler(todo)}
                  >
                    <i className='fa-solid fa-trash'></i>
                  </Button>
                  {/* toggle button */}
                  <Button
                    className='me-3'
                    variant='primary'
                    onClick={() => toggleHandler(todo)}
                  >
                    <i
                      className='fa-solid fa-circle'
                      style={{ color: 'red' }}
                    ></i>
                  </Button>
                </div>
              </Card>
            ) : (
              // if todo is completed, then display below card with the todo details
              <Card key={todo.id} className='mb-3' style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title className='text-decoration-line-through text-body-secondary'>
                    {todo.title}
                  </Card.Title>
                </Card.Body>
                <div className='m-3 d-flex flex-wrap'>
                  {/* delete todo button */}
                  <Button
                    className='me-3'
                    variant='primary'
                    onClick={() => deleteHandler(todo)}
                  >
                    <i className='fa-solid fa-trash'></i>
                  </Button>
                  {/* toggle button */}
                  <Button variant='primary' onClick={() => toggleHandler(todo)}>
                    <i
                      className='fa-solid fa-circle'
                      style={{ color: 'green' }}
                    ></i>
                  </Button>
                </div>
              </Card>
            )
          )}
        </div>
      </Row>
    </Container>
  );
};

//export HomePage component
export default HomePage;
