import React from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

const HomePage = () => {
  return (
    <div>
      <Container>
        <Row>
          <Form className='d-flex'>
            <Col xs={10}>
              <Form.Control
                type='text'
                placeholder='Enter the Todo'
                className='me-2'
                aria-label='Text'
              />
            </Col>
            <Col>
              <Button variant='outline-success'>Add todo</Button>
            </Col>
          </Form>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
