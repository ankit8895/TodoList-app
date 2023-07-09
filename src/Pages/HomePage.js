import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  const [todoBody, setTodoBody] = useState('');
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
    dispatch(deleteTodoCall(todo));
  };

  const editHandler = (todo) => {
    setTodoId(todo.id);
    setTodoTitle(todo.title);
    setTodoBody(todo.body);
    window.scrollTo(0, 0);
  };

  const updateHandler = () => {
    dispatch(
      updateTodoCall({
        id: todoId,
        title: todoTitle,
        body: todoBody,
        userId: 1,
      })
    );

    setTodoTitle('');
    setTodoBody('');
    setTodoId(null);
  };

  const addHandler = () => {
    dispatch(
      addTodoCall({
        title: todoTitle,
        body: todoBody,
        userId: 1,
      })
    );

    setTodoBody('');
    setTodoTitle('');
    setTodoId(null);
  };
  return loading ? (
    <Loader />
  ) : (
    <Container className='d-flex flex-column justify-content-center'>
      <Row className='mb-3'>
        <Form>
          <Col className='mb-1'>
            <Form.Control
              type='text'
              placeholder='Enter the todo title'
              className='bg-black text-white fw-bolder'
              aria-label='Text'
              value={todoTitle}
              onChange={(e) => setTodoTitle(e.target.value)}
            />
          </Col>
          <Col className='mb-1'>
            <Form.Control
              as='textarea'
              className='bg-black text-white fw-bolder'
              placeholder='Enter the todo description'
              value={todoBody}
              onChange={(e) => setTodoBody(e.target.value)}
            />
          </Col>
          <Col>
            {todoId ? (
              <Button variant='outline-success' onClick={updateHandler}>
                Update Todo
              </Button>
            ) : (
              <Button variant='outline-success' onClick={addHandler}>
                Add todo
              </Button>
            )}
          </Col>
        </Form>
      </Row>
      <Row>
        <h1 className='fw-bolder'>TODO LIST</h1>
        <div className='d-flex flex-wrap flex-row justify-content-evenly'>
          {todos.map((todo) => (
            <Card key={todo.id} className='mb-3' style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title className='text-success'>{todo.title}</Card.Title>
                <Card.Text>{todo.body}</Card.Text>
              </Card.Body>
              <div className='sticky-bottom m-3 d-flex flex-wrap'>
                <Button
                  className='me-3'
                  variant='primary'
                  onClick={() => {
                    editHandler(todo);
                  }}
                >
                  <i className='fa-solid fa-pen-to-square'></i>
                </Button>
                <Button variant='primary' onClick={() => deleteHandler(todo)}>
                  <i className='fa-solid fa-square-minus'></i>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Row>
    </Container>
  );
};

export default HomePage;
