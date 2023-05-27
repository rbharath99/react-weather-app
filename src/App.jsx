import './App.css'
import Weather from './feature/weather/Weather'
import Navbar from './Navbar';

function App() {
  return (
    <div className="container">
      <div className="d-flex border-bottom pt-2 pb-2 mb-5">
        <div className="p-2 flex-grow-1">Weather Forecast</div>
        <Navbar />
      </div>
      <Weather />
    </div>
  )
}

export default App
