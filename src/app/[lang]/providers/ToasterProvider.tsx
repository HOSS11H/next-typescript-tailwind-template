'use client';

//import ThemeContext from '../../app/context/theme-context';
import { useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToasterProvider = () => {
  //const { direction } = useContext(ThemeContext);

  return (
    <ToastContainer
      position="bottom-right"
      autoClose={4000}  
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick
      //rtl={direction === 'rtl'}
      pauseOnHover={false}
      draggable={false}
    />
  );
};
export default ToasterProvider;
