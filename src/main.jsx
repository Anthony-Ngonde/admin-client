//Root file
import './index.css';
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client'
import {router} from './routes'
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Toaster position="top-center" />
    <RouterProvider router={router} />
  </React.StrictMode>
);
