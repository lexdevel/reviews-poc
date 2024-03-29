import { FunctionComponent, useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';

import { apolloClient } from '../../lib/apollo-client';
import { fetchUsersQuery } from '../../requests';
import { User } from '../../models';

export const UsersTable: FunctionComponent = () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    const response = await apolloClient.query({ query: fetchUsersQuery});
    setUsers(response.data.users);
  };

  useEffect(() => { fetchUsers().catch(console.error); }, []);

  return (
    <Table bordered hover>
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
              <td width="20%"><code>{user.id}</code></td>
              <td>{user.username}</td>
              <td>{user.fullname}</td>
              <td>
                <Table hover size="sm">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Commentary</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      user.reviews!.map(review => (
                        <tr key={`${user.id}-${review.id}`}>
                          <td width="20%">{review.product!.title}</td>
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
