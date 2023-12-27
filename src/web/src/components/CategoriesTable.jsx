import { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useAuth } from 'react-oidc-context';

import { apolloClient } from '../lib/apollo-client';
import { fetchCategoriesQuery } from '../requests';

export function CategoriesTable() {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    const response = await apolloClient.query({ query: fetchCategoriesQuery });
    setCategories(response.data.categories);
  };

  useEffect(() => { fetchCategories().catch(console.error); }, []);


  const auth = useAuth();

  return (
    <Table bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          {
            auth.isAuthenticated
              ? <th></th>
              : null
          }
        </tr>
      </thead>
      <tbody>
        {
          categories.map(category => (
            <tr key={category.id}>
              <td width="20%"><code>{category.id}</code></td>
              <td>{category.name}</td>
              {
                auth.isAuthenticated
                  ? <td width="10%"><Button variant="danger" size="sm">Delete</Button></td>
                  : null
              }
            </tr>
          ))
        }
      </tbody>
    </Table>
  )
}
