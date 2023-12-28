import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';

import { apolloClient } from '../../lib/apollo-client';
import { fetchProductsQuery } from '../../requests';

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
          <th>Category</th>
          <th>Tags</th>
          <th>Reviews</th>
        </tr>
      </thead>
      <tbody>
        {
          products.map(product => (
            <tr key={product.id}>
              <td width="20%"><code>{product.id}</code></td>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>{product.category.name}</td>
              <td>
                {
                  <Table hover size="sm">
                    <tbody>
                      {
                        product.tags.map(tag => (
                          <tr key={`${product.id}-${tag.id}`}>
                            <td>{tag.name}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </Table>
                }
              </td>
              <td>
                <Table hover size="sm">
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
