import { gql } from '@apollo/client';

export const removeCategoryMutation = gql`
mutation RemoveCategory($id: ID!) {
  removeCategory(id: $id)
}
`
