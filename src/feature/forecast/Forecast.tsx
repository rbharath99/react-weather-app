import React from 'react'
import { useSelector } from 'react-redux'
import { Row, Container } from 'react-bootstrap'
import Loader from '../../Loader'
import ForecastCard from './ForecastCard'
import { RootState } from '../../../app/Store';

function Forecast() {
    const { forecastData, loading } = useSelector((state: RootState) => state.forecast)

    if (loading) {
        <Loader />
    }

    if (forecastData) {
        return (
            <Container>
                <div className="d-flex flex-wrap justify-content-center">
                    {forecastData.list.map((forecast) => (
                        <Row key={forecast.dt}>
                            <div className="p-2" >
                                <ForecastCard forecast={forecast} />
                            </div>
                        </Row>
                    ))}
                </div>
            </Container>
        )
    }
}

export default Forecast
