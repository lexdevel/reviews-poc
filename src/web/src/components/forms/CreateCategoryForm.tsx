import { FunctionComponent, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

import { apolloClient } from '../../lib/apollo-client';
import { createCategoryMutation } from '../../requests';
import { useCategoriesContext } from '../../providers/CategoriesProvider';

type CreateCategoryFormProps = {
  show: boolean;
  onHide: () => void;
};

export const CreateCategoryForm: FunctionComponent<CreateCategoryFormProps> = ({ show, onHide }: CreateCategoryFormProps) => {
  const [ name, setName ] = useState('');
  const { categories, setCategories } = useCategoriesContext();

  const handleCreate = async () => {
    const response = await apolloClient.mutate({
      mutation: createCategoryMutation,
      variables: {
        name,
      },
    });

    const category = { id: response.data.createCategory, name: name };
    // addCategory(category);
    setCategories([...categories, category]);

    setName('');
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} animation={true} size="sm">
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
