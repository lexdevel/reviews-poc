import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';

import { apolloClient } from '../../lib/apollo-client';
import { fetchReviewsQuery } from '../../requests';

export function ReviewsTable() {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    const response = await apolloClient.query({ query: fetchReviewsQuery});
    setReviews(response.data.reviews);
  };

  useEffect(() => { fetchReviews().catch(console.error); }, []);

  return (
    <Table bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Commentary</th>
          <th>Product</th>
          <th>Author</th>
        </tr>
      </thead>
      <tbody>
        {
          reviews.map(review => (
            <tr key={`${review.id}-${review.product.id}-${review.author.id}`}>
              <td width="20%"><code>{review.id}</code></td>
              <td>{review.commentary}</td>
              <td>
                <Table hover size="sm">
                  <tbody>
                    <tr>
                      <td><b>ID</b></td>
                      <td>{review.product.id}</td>
                    </tr>
                    <tr>
                      <td><b>Title</b></td>
                      <td>{review.product.title}</td>
                    </tr>
                    <tr>
                      <td><b>Price</b></td>
                      <td>${review.product.price}</td>
                    </tr>
                    <tr>
                      <td><b>Category</b></td>
                      <td>{review.product.category.name}</td>
                    </tr>
                    <tr>
                      <td><b>Tags</b></td>
                      <td>
                        {
                          review.product.tags.map(tag => (
                            <span key={tag.id} className="badge bg-secondary me-2">{tag.name}</span>
                          ))
                        }
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </td>
              <td>
                <Table hover size="sm">
                  <tbody>
                    <tr>
                      <td><b>ID</b></td>
                      <td>{review.author.id}</td>
                    </tr>
                    <tr>
                      <td><b>Name</b></td>
                      <td>{review.author.fullname}</td>
                    </tr>
                    <tr>
                      <td><b>Username</b></td>
                      <td>{review.author.username}</td>
                    </tr>
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
