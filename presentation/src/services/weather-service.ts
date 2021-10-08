import { LocationModel, WeatherModel } from 'models';
import { Service } from './service';

class WeatherService extends Service {
  public async forLocation(location: LocationModel): Promise<WeatherModel> {
    const data = await this.request<any>('data/2.5/weather', {
      lat: location.lat,
      lon: location.lon,
      units: 'metric',
    });

    const weather = new WeatherModel();
    weather.temperature = data.main.temp;
    weather.feelsLike = data.main.feels_like;
    weather.humidity = data.main.humidity;

    return weather;
  }
}

export const weatherService = new WeatherService();
