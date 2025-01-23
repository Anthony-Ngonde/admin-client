//Routing the application

import { createBrowserRouter } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Members from './components/Members/Members';
import Payment from './components/Payment/Payment';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/members',
    element: <Members />,
  },
  {
    path: '/payments',
    element: <Payment />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);
