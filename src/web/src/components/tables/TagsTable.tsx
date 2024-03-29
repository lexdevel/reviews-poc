import { FunctionComponent, useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useAuth } from 'react-oidc-context';

import { apolloClient } from '../../lib/apollo-client';
import { fetchTagsQuery } from '../../requests';
import { Tag } from '../../models';

export const TagsTable: FunctionComponent = () => {
  const [tags, setTags] = useState<Tag[]>([]);

  const fetchTags = async () => {
    const response = await apolloClient.query({ query: fetchTagsQuery });
    setTags(response.data.tags);
  };

  useEffect(() => { fetchTags().catch(console.error); }, []);

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
          tags.map(tag => (
            <tr key={tag.id}>
              <td width="20%">{tag.id}</td>
              <td>{tag.name}</td>
              {
                auth.isAuthenticated
                  ? <td><Button variant="danger" size="sm">Delete</Button></td>
                  : null
              }
            </tr>
          ))
        }
      </tbody>
    </Table>
  )
}
