export function ReviewsTable({ reviews }) {

  return (
    <div>
      <h2>Reviews</h2>
      <table>
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
              <tr key={review.id}>
                <td>{review.product.title}</td>
                <td>{review.author.fullname}</td>
                <td>{review.commentary}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
