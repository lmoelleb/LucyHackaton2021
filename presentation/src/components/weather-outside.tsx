import { Alert } from 'antd';
import { Location } from 'components';
import { LocationModel, WeatherModel } from 'models';
import { useWeatherController } from 'providers';
import { useEffect, useState } from 'react';
import { weatherService } from 'services';

import './weather-outside.css';

type WeatherOutsideProps = {
  refreshTimeout?: number;
};

export const WeatherOutside: React.FC<WeatherOutsideProps> = ({
  refreshTimeout = 60000,
}) => {
  const weatherController = useWeatherController();
  const [weather, setWeather] = useState<WeatherModel | undefined>();

  // Requests for current weather each `refreshTimeout` milliseconds.
  useEffect(() => {
    if (!weatherController.location) return;

    let mounted = true;
    let timeout: NodeJS.Timeout;

    function getWeather(location: LocationModel) {
      weatherService.forLocation(location).then((weatherData) => {
        if (!mounted) return;
        setWeather(weatherData);

        timeout = setTimeout(() => {
          getWeather(location);
        }, refreshTimeout);
      });
    }

    getWeather(weatherController.location);

    return () => {
      clearTimeout(timeout);
      mounted = false;
    };
  }, [weatherController.location, refreshTimeout]);

  if (!weatherController.location) {
    return null;
  }

  if (!weather) {
    return (
      <Alert
        message="We do not know the current weather but will tell you soon!"
        type="info"
      />
    );
  }

  return (
    <div className="weather-outside">
      <p className="weather-outside__temperature">
        {weather.temperature}&deg;C
      </p>
      <p className="weather-outside__place">
        <Location for={weatherController.location} />
      </p>
      <p className="weather-outside__feels-like">
        Feels like {weather.feelsLike}&deg;C
      </p>
      <p className="weather-outside__humidity">Humidity {weather.humidity}%</p>
    </div>
  );
};
