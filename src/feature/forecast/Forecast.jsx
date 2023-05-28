import React from 'react'
import { useSelector } from 'react-redux'
import ForecastCard from './ForecastCard';
import { Row, Container } from 'react-bootstrap';
import Loader from '../../Loader';

function Forecast() {
    const forecastData = useSelector((state) => state.forecast.forecastData);
    const isLoading = useSelector((state) => state.forecast.isLoading);

    if (isLoading) {
        <Loader />
    }

    if (forecastData) {
        return (
            <Container>
                <div className="d-flex flex-wrap justify-content-center">
                    {forecastData.list.map((forecast) => (
                        <Row>
                            <div className="p-2" key={forecast.dt}>
                                <ForecastCard forecast={forecast} />
                            </div>
                        </Row>
                    ))}
                </div>
            </Container>
        );
    }

}

export default Forecast;