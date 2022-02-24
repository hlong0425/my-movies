import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import CustomModal from './components/CustomModal/CustomModal';
import ModalProvider from './context/modal-context';
ReactDOM.render(
  <ModalProvider>
    <BrowserRouter>
      <App />
      <CustomModal />
    </BrowserRouter>
  </ModalProvider>
  ,
  document.getElementById('root')
);

