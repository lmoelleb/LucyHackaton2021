import { makeAutoObservable, runInAction } from 'mobx';
import { LocationModel } from 'models';
import { currentTemperature } from 'services/current-temperature';

export class WeatherController {
  public currentTemperature?: number;
  public currentHumidity?: number;
  public location?: LocationModel;

  constructor() {
    makeAutoObservable(this);

    this.cleanLocation = this.cleanLocation.bind(this);

    this.loadCurrentTemperature();

    const savedLocation = localStorage.getItem('location');
    if (savedLocation) {
      try {
        this.setLocation(LocationModel.fromJSON(JSON.parse(savedLocation)));
      } catch (e) {
        console.warn('Can not restore saved location.');
      }
    }
  }

  public get placeName(): string | undefined {
    return this.location?.name ?? undefined;
  }

  public setLocation(location: LocationModel) {
    this.location = location;

    localStorage.setItem('location', JSON.stringify(location.toJSON()));
  }

  public cleanLocation() {
    this.location = undefined;
    localStorage.removeItem('location');
  }

  private async loadCurrentTemperature() {
    try {
      const data = await currentTemperature.get();

      runInAction(() => {
        this.currentHumidity = data.humidity;
        this.currentTemperature = data.temperature;
      });
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => {
        this.loadCurrentTemperature();
      }, 5000);
    }
  }
}
