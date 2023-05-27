import './App.css'
import Weather from './feature/weather/Weather'
import Navbar from './Navbar';
import { Container, Row, Col } from 'react-bootstrap';

function App() {
  return (
    <Container>
      <Row className="border-bottom pt-2 pb-2 mb-5">
        <Col>
          <Navbar />
        </Col>
      </Row>
      <Weather />
    </Container>
  )
}

export default App
