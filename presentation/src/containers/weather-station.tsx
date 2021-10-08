import { Place, PlaceSelector, WeatherOutside } from 'components';
import { observer } from 'mobx-react-lite';
import { useWeatherController } from 'providers';

export const WeatherStation: React.FC = observer(() => {
  const weatherController = useWeatherController();

  return (
    <>
      <h1>Weather station.</h1>
      <p>Temp: {weatherController.currentTemperature ?? 'unknown'}</p>
      <p>Humidity: {weatherController.currentHumidity ?? 'unknown'}</p>

      {weatherController.placeName === undefined && <PlaceSelector />}

      {weatherController.placeName && <Place />}
      <WeatherOutside />
    </>
  );
});
