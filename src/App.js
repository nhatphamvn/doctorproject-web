import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Nav from './component/Navigation/Nav';
import Layout from './component/Router/layout';

const App = () => {
  return (
    <Router>
      <Nav /> {/* Thanh điều hướng */}
      <Layout/> {/* Các route */}
    </Router>
  );
};

export default App;
