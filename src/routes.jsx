//Routing the application

import { createBrowserRouter } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Members from './components/Members/Members';
import Payment from './components/Payment/Payment';

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
]);
