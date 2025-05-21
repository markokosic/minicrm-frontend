import { createBrowserRouter, RouterProvider } from 'react-router';

import { Test } from '@/components/Test';
import Login from './routes/auth/Login';

const router = createBrowserRouter([
  {
    // element: <div></div>, //TODO Hier Layout hinein
    children: [
      { index: true, element: <Test /> },
      { path: '*', element: <div>Not found</div> },
      { path: 'about', element: <Test /> },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Test />,
      },
      {
        path: 'concerts',
        children: [
          { index: true, element: <div>Concerts</div> },
          { path: ':city', element: <Test /> },
          { path: 'trending', element: <Test /> },
        ],
      },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
