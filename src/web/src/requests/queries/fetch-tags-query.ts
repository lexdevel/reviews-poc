import { gql } from '@apollo/client';

export const fetchTagsQuery = gql`
query {
  tags {
    id
    name
  }
}
`
