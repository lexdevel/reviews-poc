import { gql } from '@apollo/client';

export const fetchCategoriesQuery = gql`
query {
  categories {
    id
    name
  }
}
`
