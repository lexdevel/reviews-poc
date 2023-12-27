import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';

import { apolloClient } from '../lib/apollo-client';
import { fetchProductsQuery } from '../requests';

export function ProductsTable() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await apolloClient.query({ query: fetchProductsQuery});
    setProducts(response.data.products);
  };

  useEffect(() => { fetchProducts().catch(console.error); }, []);

  return (
    <Table bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Price</th>
          <th>Reviews</th>
        </tr>
      </thead>
      <tbody>
        {
          products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>
                <Table hover>
                  <thead>
                    <tr>
                      <th>Author</th>
                      <th>Commentary</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      product.reviews.map(review => (
                        <tr key={`${product.id}-${review.id}-${review.author.id}`}>
                          <td>{review.author.fullname}</td>
                          <td>{review.commentary}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </Table>
              </td>
            </tr>
          ))
        }
      </tbody>
    </Table>
  )
}
