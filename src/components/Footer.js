import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3 fw-bolder fs-5'>
            Copyright &copy; TodoList
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
