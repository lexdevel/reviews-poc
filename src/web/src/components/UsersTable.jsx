export function UsersTable({ users }) {

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Fullname</th>
            <th>Reviews</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.fullname}</td>
                <td>
                  <table>
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Commentary</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        user.reviews.map(review => (
                          <tr key={review.id}>
                            <td>{review.product.title}</td>
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
