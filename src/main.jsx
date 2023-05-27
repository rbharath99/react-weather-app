import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import store from '../app/Store';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './Error';
import Favorites from './feature/favorites/Favorites';
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/favorites",
    element: <Favorites />,
    errorElement: <ErrorPage></ErrorPage>,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
)
