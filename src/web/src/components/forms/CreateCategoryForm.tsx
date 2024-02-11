import { FormEvent, FunctionComponent, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

import { apolloClient } from '../../lib/apollo-client';
import { createCategoryMutation } from '../../requests';
import { useCategoriesContext } from '../../providers/CategoriesProvider';

type CreateCategoryFormProps = {
  show: boolean;
  onHide: () => void;
};

export const CreateCategoryForm: FunctionComponent<CreateCategoryFormProps> = ({ show, onHide }: CreateCategoryFormProps) => {
  const [ categoryName, setCategoryName ] = useState('');
  const { categories, setCategories } = useCategoriesContext();

  const createCategory = async () => {
    const response = await apolloClient.mutate({
      mutation: createCategoryMutation,
      variables: {
        name,
      },
    });

    const category = { id: response.data.createCategory, name: categoryName };
    setCategories([...categories, category]);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    await createCategory();

    setCategoryName('');
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} animation={true} size="sm">
      <Modal.Header closeButton>
        <Modal.Title>Create new category</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <input type="text" className="form-control mb-3" placeholder="Category name" value={categoryName} onChange={event => setCategoryName(event.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" disabled={categoryName.length == 0} onClick={handleSubmit}>Create</Button>
          <Button variant="secondary" onClick={onHide}>Cancel</Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}
