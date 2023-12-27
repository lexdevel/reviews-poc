import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from 'react-oidc-context';

import { Home, LoginPage, ProductsPage, ReviewsPage, UsersPage, CategoriesPage, TagsPage } from './pages';

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
        path: '/categories',
        element: <CategoriesPage />
      },
      {
        path: '/tags',
        element: <TagsPage />
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
      },
      {
        path: '/login',
        element: <LoginPage />
      }
    ]
  }
]);

const oidc = {
  authority: 'http://localhost:4001',
  grant_type: 'password',
  client_id: 'reviews-poc-client',
  client_secret: 'qwe123f43223ds',
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider {...oidc}>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
)
