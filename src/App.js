import React from 'react';
import Header from './component/Navigation/Header';
import { Outlet } from 'react-router-dom';

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

      </div>
      </>
  );
};

export default App;
