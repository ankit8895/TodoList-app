//import react
import React from 'react';
//import Container, Row , Col
import { Container, Row, Col } from 'react-bootstrap';

//create react functional component Footer
const Footer = () => {
  return (
    <footer
      className='sticky-bottom d-flex justify-content-center align-items-center'
      style={{ backgroundColor: '#375a7f', height: '50px' }}
    >
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

//export Footer component
export default Footer;
