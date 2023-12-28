import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useAuth } from 'react-oidc-context';
import { CategoriesTable, CreateCategoryForm } from '../components';

export function CategoriesPage() {
  const [showCreateCategoryForm, setShowCreateCategoryForm] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate();

  if (!auth.isAuthenticated) {
    navigate('/');
    return;
  }

  return (
    <>
      <h2>Categories</h2>
      <CategoriesTable />
      {
        auth.isAuthenticated && auth.user.scopes.includes('admin')
          ? <Button variant="primary" size="sm" onClick={() => setShowCreateCategoryForm(true)}>Add</Button>
          : null
      }
      <CreateCategoryForm show={showCreateCategoryForm} onHide={() => { setShowCreateCategoryForm(false); navigate('/categories', { replace: true }); } } />
    </>
  )
}
