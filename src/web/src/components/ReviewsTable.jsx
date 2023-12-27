import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';

import { apolloClient } from '../lib/apollo-client';
import { fetchReviewsQuery } from '../requests';

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
          <th>Product</th>
          <th>Author</th>
          <th>Commentary</th>
        </tr>
      </thead>
      <tbody>
        {
          reviews.map(review => (
            <tr key={`${review.id}-${review.product.id}-${review.author.id}`}>
              <td>{review.product.title}</td>
              <td>{review.author.fullname}</td>
              <td>{review.commentary}</td>
            </tr>
          ))
        }
      </tbody>
    </Table>
  )
}
