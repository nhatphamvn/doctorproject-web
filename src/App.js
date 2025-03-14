import React from 'react';
import Header from './containers/Header/Header';
import { Outlet } from 'react-router-dom';
import HomePage from './containers/Homepage/HomePage';
import Footer from './containers/Footer/pages/Footer';

const App = () => {

  return (
      <>
      <div className='app-container'>
        <div className='app-header'>
          <Header/>
        </div>
        <div className='main-container'>
            <div className='app-content'>
              <Outlet/>
            </div>
        </div>
        {/* <Footer/> */}

      </div>
      </>
  );
};

export default App;
