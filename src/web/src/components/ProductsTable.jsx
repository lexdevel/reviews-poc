export function ProductsTable({ products }) {

  return (
    <div>
      <h2>Products</h2>
      <table>
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
                  <table>
                    <thead>
                      <tr>
                        <th>Author</th>
                        <th>Commentary</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        product.reviews.map(review => (
                          <tr key={review.id}>
                            <td>{review.author.fullname}</td>
                            <td>{review.commentary}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
