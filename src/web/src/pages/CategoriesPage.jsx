import { useNavigate } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';
import { CategoriesTable } from '../components';

export function CategoriesPage() {
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
    </>
  )
}
