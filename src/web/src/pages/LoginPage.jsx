import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';
import { Form, Button, Container } from 'react-bootstrap';

export function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const auth = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async (event) => {
    event.preventDefault();

    const response = await auth.signinResourceOwnerCredentials({ username, password });
    if (response) {
      navigate('/');
    } else {
      setErrorMessage('Invalid username or password');
    }
  };

  return (
    <>
      <Container>
        <h2>Sign In</h2>

        <Form onSubmit={handleSignIn}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Username" value={username} onChange={event => setUsername(event.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={event => setPassword(event.target.value)} />
          </Form.Group>

          {!!errorMessage
            ? <Form.Group className="mb-3">
                <Form.Text className="text-danger">
                  {errorMessage}
                </Form.Text>
              </Form.Group>
            : null
          }

          <Form.Group className="mb-3">
            <Button variant="primary" type="submit" className="pull-right">
              Submit
            </Button>
          </Form.Group>
        </Form>
      </Container>

      <hr />
      <p className="small">
        Use <code>admin</code> as username and <code>admin</code> as password for <strong>admin</strong> access.<br />
        Use <code>hsimpson</code> as username and <code>123456</code> as password for <strong>user</strong> access.<br />
        Use <code>pgriffin</code> as username and <code>123456</code> as password for <strong>user</strong> access.
      </p>
    </>
  )
}
