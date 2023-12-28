import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

import { apolloClient } from '../../lib/apollo-client';
import { createCategoryMutation } from '../../requests';

export function CreateCategoryForm({ show, onHide }) {
  const [name, setName] = useState('');

  const handleCreate = async () => {
    await apolloClient.mutate({
      mutation: createCategoryMutation,
      variables: {
        name,
      },
    });

    setName('');
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} animation={true} size="md">
      <Modal.Header closeButton>
        <Modal.Title>Create new category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input type="text" className="form-control mb-3" placeholder="Category name" value={name} onChange={event => setName(event.target.value)} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" disabled={name.length == 0} onClick={handleCreate}>Create</Button>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  )
}
