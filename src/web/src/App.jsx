import { ApolloClient, ApolloProvider, InMemoryCache, gql } from '@apollo/client';
import { useEffect, useState } from 'react'

import { ProductsTable } from './components/ProductsTable';

import { fetchProductsQuery } from './requests/fetch-products-query';
import { fetchReviewsQuery } from './requests/fetch-reviews-query';
import { fetchUsersQuery } from './requests/fetch-users-query';
import { ReviewsTable } from './components/ReviewsTable';
import { UsersTable } from './components/UsersTable';

const apolloClient = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

export default function App() {
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchProducts = async () => {
    const response = await apolloClient.query({ query: fetchProductsQuery});
    setProducts(response.data.products);
  };

  const fetchReviews = async () => {
    const response = await apolloClient.query({ query: fetchReviewsQuery});
    setReviews(response.data.reviews);
  };

  const fetchUsers = async () => {
    const response = await apolloClient.query({ query: fetchUsersQuery});
    setUsers(response.data.users);
  };

  useEffect(() => {
    fetchProducts().catch(console.error);
    fetchReviews().catch(console.error);
    fetchUsers().catch(console.error);
  }, []);

  return (
    <>
      <h1>Reviews POC</h1>
      <div>
        <ProductsTable products={products} />
        <ReviewsTable reviews={reviews} />
        <UsersTable users={users} />
      </div>
    </>
  )
}
