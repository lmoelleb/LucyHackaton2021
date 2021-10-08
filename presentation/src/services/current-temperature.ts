import { CurrentWeather } from 'models';
import { Service } from './service';

class CurrentTemperature extends Service {
  public async get(): Promise<CurrentWeather> {
    const response = await fetch(
      'https://rpetrov.ru/lucy/data.txt?t=' + new Date().getTime()
    );

    if (!response.ok) {
      throw new Error('Invalid response.');
    }

    try {
      const data = await response.json();

      return {
        temperature: data.temp,
        humidity: data.hum,
      };
    } catch (e) {
      console.error(e);
      throw new Error('Data parsing error');
    }
  }
}

export const currentTemperature = new CurrentTemperature();
