import { Outlet } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';

export default function App() {

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
            </Nav>
          </Container>
        </Navbar>
      </header>

      <main role="main">
        <Container>
          {/* <ProductsTable />
          <ReviewsTable />
          <UsersTable /> */}
          <Outlet />
        </Container>
      </main>
    </>
  )
}
