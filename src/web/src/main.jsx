import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Home } from './pages/Home';
import { ProductsPage } from './pages/ProductsPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { UsersPage } from './pages/UsersPage';

import App from './App';

const router= createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/products',
        element: <ProductsPage />
      },
      {
        path: '/reviews',
        element: <ReviewsPage />
      },
      {
        path: '/users',
        element: <UsersPage />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
