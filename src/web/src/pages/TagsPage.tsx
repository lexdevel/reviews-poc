import { useNavigate } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';
import { TagsTable } from '../components';

export function TagsPage() {
  const auth = useAuth();
  const navigate = useNavigate();

  if (!auth.isAuthenticated) {
    navigate('/');
    return;
  }

  return (
    <>
      <h2>Tags</h2>
      <TagsTable />
    </>
  )
}
