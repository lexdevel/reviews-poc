import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from 'react-oidc-context';

import { oidc } from './lib/apollo-client';

import { HomePage } from './pages/HomePage';
import { CategoriesPage } from './pages/CategoriesPage';
import { TagsPage } from './pages/TagsPage';
import { ProductsPage } from './pages/ProductsPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { UsersPage } from './pages/UsersPage';
import { LoginPage } from './pages/LoginPage';
import { App } from './App';

const router= createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />
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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider {...oidc}>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
)
