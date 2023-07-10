import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import Loader from '../components/Loader';
import {
  fetchTodoCall,
  deleteTodoCall,
  updateTodoCall,
  addTodoCall,
} from '../redux/reducers/todoReducer';

const HomePage = () => {
  const [todoTitle, setTodoTitle] = useState('');
  const [todoId, setTodoId] = useState(null);
  const todoDetails = useSelector((state) => state.todoReducer);
  const { loading, todos } = todoDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    if (todos.length === 0) {
      dispatch(fetchTodoCall());
    }
  }, [dispatch, todos]);

  const deleteHandler = (todo) => {
    if (!todo.Completed) {
      if (window.confirm('Task is not complete yet. Are you sure ?')) {
        dispatch(deleteTodoCall(todo));
        toast.error('Task deleted successfully');
      }
    } else {
      dispatch(deleteTodoCall(todo));
      toast.error('Task deleted successfully');
    }
  };

  const editHandler = (todo) => {
    setTodoId(todo.id);
    setTodoTitle(todo.title);
    window.scrollTo(0, 0);
  };

  const updateHandler = () => {
    dispatch(
      updateTodoCall({
        id: todoId,
        title: todoTitle,
        Completed: false,
        userId: 1,
      })
    );

    toast.success('Task update successfully');

    setTodoTitle('');
    setTodoId(null);
  };

  const addHandler = () => {
    dispatch(
      addTodoCall({
        title: todoTitle,
        Completed: false,
        userId: 1,
      })
    );

    toast.success('Task added successfully');

    setTodoTitle('');
    setTodoId(null);
  };

  const toggleHandler = (todo) => {
    if (!todo.Completed) {
      toast.success('Congrats!!! Task completed');
    }
    dispatch(
      updateTodoCall({
        id: todo.id,
        title: todo.title,
        Completed: !todo.Completed,
        userId: 1,
      })
    );
  };
  return loading ? (
    <Loader />
  ) : (
    <Container>
      <Row className='mb-1'>
        <Col>
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
              <Button
                variant='success'
                className='fw-bolder'
                style={{ minWidth: '100px' }}
                onClick={updateHandler}
              >
                Update
              </Button>
            ) : (
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
          {todos.map((todo) =>
            !todo.Completed ? (
              <Card key={todo.id} className='mb-3' style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title className='text-success'>{todo.title}</Card.Title>
                </Card.Body>
                <div className='m-3 d-flex flex-wrap'>
                  <Button
                    className='me-3'
                    variant='primary'
                    onClick={() => {
                      editHandler(todo);
                    }}
                  >
                    <i className='fa-solid fa-pen-to-square'></i>
                  </Button>
                  <Button
                    className='me-3'
                    variant='primary'
                    onClick={() => deleteHandler(todo)}
                  >
                    <i className='fa-solid fa-trash'></i>
                  </Button>

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
              <Card key={todo.id} className='mb-3' style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title className='text-decoration-line-through text-body-secondary'>
                    {todo.title}
                  </Card.Title>
                </Card.Body>
                <div className='m-3 d-flex flex-wrap'>
                  <Button
                    className='me-3'
                    variant='primary'
                    onClick={() => deleteHandler(todo)}
                  >
                    <i className='fa-solid fa-trash'></i>
                  </Button>

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

export default HomePage;
