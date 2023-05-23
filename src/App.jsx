import './App.css'
import Weather from './feature/weather/Weather'

function App() {
  return (
    <div className="container">
      <div className="d-flex border-bottom pt-2 pb-2 mb-5">
        <div className="p-2 flex-grow-1">Redux Store</div>
      </div>
      <Weather />
    </div>
  )
}

export default App
