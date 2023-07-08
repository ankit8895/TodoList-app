import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

const Header = () => {
  return (
    <header className='sticky-top'>
      <Navbar bg='primary' data-bs-theme='dark'>
        <Container>
          <Navbar.Brand className='fw-bolder fs-5'>
            <img
              alt='app-icon'
              src='https://cdn-icons-png.flaticon.com/128/10605/10605977.png'
              width='30'
              height='30'
              className='d-inline-block align-top me-2'
            />
            TodoList
          </Navbar.Brand>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
