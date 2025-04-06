import {useEffect} from 'react';
import Header from './containers/Header/Header';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { initializeAuth } from './redux/features/authSlide/authSlide';


const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);


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
