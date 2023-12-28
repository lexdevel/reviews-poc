import { ApolloClient, InMemoryCache } from '@apollo/client';

export const oidc = {
  authority: 'http://localhost:4001',
  grant_type: 'password',
  client_id: 'reviews-poc-client',
  client_secret: 'qwe123f43223ds',
  redirect_uri: '',
};

const buildAuthorizationHeader = () => {
  const session = sessionStorage.getItem(`oidc.user:${oidc.authority}:${oidc.client_id}`);
  if (!session) {
    return '';
  }

  const { access_token, token_type } = JSON.parse(session);
  return `${token_type} ${access_token}`;
}

export const apolloClient = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
  headers: {
    authorization: buildAuthorizationHeader()
  }
});
