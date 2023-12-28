import { FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useAuth } from 'react-oidc-context';
import { CategoriesTable, CreateCategoryForm } from '../components';
import { CategoriesProvider } from '../providers/CategoriesProvider';

export const CategoriesPage: FunctionComponent = () => {
  const [showCreateCategoryForm, setShowCreateCategoryForm] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate();

  if (!auth.isAuthenticated) {
    navigate('/');
    return;
  }

  return (
    <CategoriesProvider>
      <h2>Categories</h2>
      <CategoriesTable />
      {
        auth.isAuthenticated && auth.user?.scopes.includes('admin')
          ? <Button variant="primary" size="sm" onClick={() => setShowCreateCategoryForm(true)}>Add</Button>
          : <></>
      }
      <CreateCategoryForm show={showCreateCategoryForm} onHide={() => { setShowCreateCategoryForm(false); navigate('/categories', { replace: true }); } } />
    </CategoriesProvider>
  )
}
