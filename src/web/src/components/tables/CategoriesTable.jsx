import { Button, Table } from 'react-bootstrap';
import { useAuth } from 'react-oidc-context';

import { useCategoriesContext } from '../../providers/CategoriesProvider';
import { apolloClient } from '../../lib/apollo-client';
import { removeCategoryMutation } from '../../requests';

export function CategoriesTable() {
  const auth = useAuth();
  const { categories, setCategories } = useCategoriesContext();

  const removeCategory = async (category) => {
    await apolloClient.mutate({ mutation: removeCategoryMutation, variables: { id: category.id } });
    setCategories(categories.filter(c => c.id != category.id));
  };

  return (
    <Table bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          {
            auth.isAuthenticated && auth.user.scopes.includes('admin')
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
                auth.isAuthenticated && auth.user.scopes.includes('admin')
                  ? <td width="20%">
                      {/*<Button variant="warning" size="sm" className="me-1">Edit</Button>*/}
                      <Button variant="danger" size="sm" className="me-1" onClick={() => removeCategory(category)}>Delete</Button>
                    </td>
                  : null
              }
            </tr>
          ))
        }
      </tbody>
    </Table>
  )
}
