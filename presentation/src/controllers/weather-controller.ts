import { makeAutoObservable } from 'mobx';
import { LocationModel } from 'models';

export class WeatherController {
  public currentTemperature?: number;
  public currentHumidity?: number;
  public location?: LocationModel;

  constructor() {
    makeAutoObservable(this);

    this.cleanLocation = this.cleanLocation.bind(this);

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
}
