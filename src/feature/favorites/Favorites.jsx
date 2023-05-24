import { useSelector } from 'react-redux'

function FavoriteWeather() {
  const favorites = useSelector((state) => state.favorite.data);

  console.log(favorites)

  return (
    <div className='weather-card-layout'>
      {favorites.map((favorite) => (
        <div key={favorite.id}>
          <h2>{JSON.stringify(favorite.name)}</h2>
          <p>{JSON.stringify(favorite.main.temp)}</p>
        </div>
      ))}
    </div>
  );

}

export default FavoriteWeather