// import react
import React from 'react';
//import spinner
import { Spinner } from 'react-bootstrap';

//create react functional component Loader for loading effect
const Loader = () => {
  return (
    <Spinner
      animation='border'
      role='status'
      style={{
        width: '100px',
        height: '100px',
        margin: 'auto',
        display: 'block',
      }}
    ></Spinner>
  );
};

//export Loader component
export default Loader;
