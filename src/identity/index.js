import Provider from 'oidc-provider';

const configuration = {
  clients: [
    {
      client_id: 'reviews-poc-server',
      client_secret: 'cxop234d1sd23f',
      grant_types: [ 'client_credentials' ],
      redirect_uris: [],
      response_types: [],
    },
    {
      client_id: 'reviews-poc-client',
      client_secret: 'qwe123f43223ds',
      redirect_uris: [ 'http://localhost:3000/callback' ],
    }
  ],
  features: {
    clientCredentials: { enabled: true },
  },
};

const oidc = new Provider('http://localhost:4001', configuration);
oidc.listen(4001, () => console.log('oidc-provider listening on port 4001, check http://localhost:4001/.well-known/openid-configuration'));
