import { signup } from './authSlice';
import { Card, Form, Container, Row, Col, Button, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { InfoCircle } from 'react-bootstrap-icons';
import { changeLearnModal } from '../learn/learnSlice';

function Signup() {
  const { errorMessage } = useSelector(state => state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = (e) => {
    dispatch(signup(e, () => {
      navigate('/')
      dispatch(changeLearnModal({modalShow: true, topic: 'intro'}));
    }));
  };

  return (
    <Container className='mt-5'>
      <Row className="align-items-center justify-content-center">
        <Col md={5}>
          <Card border="secondary" className="shadow-lg p-3 mb-5 bg-body-tertiary rounded ">
            <Card.Header>
              <Nav fill variant="tabs" defaultActiveKey="signup">
                <Nav.Item>
                  <Nav.Link eventKey="login" as={Link} to={'/login'}>Log In</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="signup" as={Link} to={'/signup'} >Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={(e) => handleSignup(e)} className='d-flex flex-column'>
                <Form.Group className="m-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" name="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group className="m-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" name="username" placeholder="Enter username" />
                </Form.Group>
                <Form.Group className="m-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="m-3">
                  <Form.Label>Confirm Password (<strong>Requires form validation</strong>)</Form.Label>
                  <Form.Control type="password" name="password" placeholder="Re-type password" />
                </Form.Group>
                <Button variant="primary" type="submit" className='align-self-center'>
                  Submit
                </Button>
              </Form>
              {
                (errorMessage === 401 || errorMessage === 404)
                && <div className='login-error'><InfoCircle /> Incorrect username or password</div>
              }
            </Card.Body>
          </Card>
        </Col>

      </Row>
    </Container>
  );
}

export default Signup;