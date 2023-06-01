import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import { toggleForecastData } from '../forecast/ForecastSlice'

function ToggleForecast () {
  const dispatch = useDispatch()
  const isToggled = useSelector((state) => state.forecast.isToggled)

  const handleToggle = () => {
    dispatch(toggleForecastData())
  }
  return (
    <ToggleButtonGroup
      type="radio"
      name="options"
      defaultValue={1}
      onChange={handleToggle}
    >
      <ToggleButton id="tbg-radio-1" value={1} defaultChecked={isToggled === 1}>
        3-hour
      </ToggleButton>
      <ToggleButton id="tbg-radio-2" value={2} defaultChecked={isToggled === 2}>
        hourly
      </ToggleButton>
    </ToggleButtonGroup>
  )
}

export default ToggleForecast
