import Provider from 'oidc-provider';

const configuration = {
  clients: [
    {
      client_id: 'reviews-poc-client',
      client_secret: 'qwe123f43223ds',
      grant_types: [ 'password', 'refresh_token' ],
      redirect_uris: [],
      response_types: [],
    },
  ],
  clientBasedCORS: (ctx, origin, client) => true,
  features: {
    clientCredentials: { enabled: true },
  }
};

// Yeah yeah, just for the demo purposes, will rewrite it. Someday. Maybe :D
const users = [
  {
    id: 0,
    username: 'admin',
    password: 'admin',
    role: 'admin',
  },
  {
    id: 1,
    username: 'hsimpson',
    password: '123456',
    role: 'user',
  },
  {
    id: 2,
    username: 'pgriffin',
    password: '123456',
    role: 'user',
  }
]

async function rewourceOwnerPasswordFlowHandler(ctx, next) {
  const { client, params } = ctx.oidc;
  const { AccessToken } = ctx.oidc.provider;

  const user = users.find(user => user.username === params.username && user.password === params.password);
  if (user) {
    const token = new AccessToken({
      client,
      scope: user.role,
    });

    const value = await token.save();

    ctx.body = {
      access_token: value,
      expires_in: token.expiration,
      token_type: token.tokenType,
      scope: token.scope,
    };

  } else {
    ctx.status = 400;
    ctx.body = {
      error: 'invalid_grant',
      error_description: 'invalid credentials provided',
    };
  }

  await next();
}

const oidc = new Provider('http://localhost:4001', configuration);
oidc.registerGrantType('password', rewourceOwnerPasswordFlowHandler, [ 'username', 'password' ]);
oidc.listen(4001, () => console.log('oidc-provider listening on port 4001, check http://localhost:4001/.well-known/openid-configuration'));
