import { Outlet, useNavigate } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { useAuth } from 'react-oidc-context';

export default function App() {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    await auth.signoutSilent();
    navigate('/');
  };

  return (
    <>
      <header>
        <Navbar bg="dark" data-bs-theme="dark">
          <Container fluid>
            <Navbar.Brand href="/">Reviews POC</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/products">Products</Nav.Link>
              <Nav.Link href="/reviews">Reviews</Nav.Link>
              <Nav.Link href="/users">Users</Nav.Link>
              {
                auth.isAuthenticated && auth.user.scopes.includes('admin')
                  ?
                    <>
                      <Nav.Link href="/categories">Categories</Nav.Link>
                      <Nav.Link href="/tags">Tags</Nav.Link>
                    </>
                  : null
              }
            </Nav>
            <Nav className="justify-content-end">
              {
                auth.isAuthenticated
                  ? <Nav.Link onClick={handleLogOut}>Logout</Nav.Link>
                  : <Nav.Link href="/login">Login</Nav.Link>
              }
            </Nav>
          </Container>
        </Navbar>
      </header>

      <main role="main">
        <Container>
          <Outlet />
        </Container>
      </main>
    </>
  )
}
