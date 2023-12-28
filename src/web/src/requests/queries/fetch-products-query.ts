import { gql } from '@apollo/client';

export const fetchProductsQuery = gql`
query {
  products {
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
    reviews {
      commentary
      author {
        id
        username
        fullname
      }
    }
  }
}
`
