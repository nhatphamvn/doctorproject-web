import { useEffect } from "react";
import Header from "./containers/Header/Header";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { initializeAuth } from "./redux/features/authSlide/authSlide";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return (
    <>
      <div className="app-container">
        <div className="app-header">
          <Header />
        </div>
        <div className="main-container">
          <div className="app-content">
            <Outlet />
          </div>
        </div>
        {/* <Footer/> */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </>
  );
};

export default App;
