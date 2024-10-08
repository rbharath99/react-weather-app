import { useSelector } from 'react-redux'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { RootState } from '../../../app/Store';

function FavoriteWeather() {
  const favorites = useSelector((state: RootState) => state.favorite.data)

  return (
    <Container style={{ paddingTop: '20px' }}>
      <Row>
        {favorites.map((favorite) => (
          <Col key={favorite.id} className="p-2">
            <Card style={{ backgroundColor: '#cccccc', width: '15rem', height: '25rem' }}>
              <Card.Body>
                <Card.Img
                  variant="top"
                  src={`http://openweathermap.org/img/wn/${favorite.weather[0].icon}@2x.png`}
                  style={{ width: '100px', height: '100px' }}
                />
                <Card.Title>{favorite.name}</Card.Title>
                <Card.Title>{favorite.weather[0].main}</Card.Title>
                <Card.Text>Temperature: {favorite.main.temp}</Card.Text>
                <Card.Text>Feels Like: {favorite.main.feels_like}</Card.Text>
                <Card.Text>Pressure: {favorite.main.pressure}</Card.Text>
                <Card.Text>Humidity: {favorite.main.humidity}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default FavoriteWeather
