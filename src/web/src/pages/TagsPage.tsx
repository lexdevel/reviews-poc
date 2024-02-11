import { useNavigate } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';
import { TagsTable } from '../components';
import { FunctionComponent } from 'react';

export const TagsPage: FunctionComponent = () => {
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
