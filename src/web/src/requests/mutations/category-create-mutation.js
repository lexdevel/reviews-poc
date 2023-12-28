import { gql } from '@apollo/client';

export const createCategoryMutation = gql`
mutation CreateCategory($name: String!) {
  createCategory(name: $name)
}
`
