import { gql } from '@apollo/client';

export const fetchUsersQuery = gql`
query {
  users {
    id
    username
    fullname
    reviews {
      commentary
      product {
        id
        title
        price
        countInStock
        category {
          id
          name
        }
        tags {
          id
          name
        }
      }
    }
  }
}
`
