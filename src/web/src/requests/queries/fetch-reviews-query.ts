import { gql } from '@apollo/client';

export const fetchReviewsQuery = gql`
query {
  reviews {
    id
    commentary
    author {
      id
      username
      fullname
    }
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
`
