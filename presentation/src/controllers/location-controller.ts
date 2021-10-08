import { makeAutoObservable, runInAction } from 'mobx';
import { LocationModel } from 'models';
import { geolocationService } from 'services';

export class LocationsController {
  public isLoading = false;
  public isError = false;
  public errorMessage?: string;
  public locations: LocationModel[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  public async search(query: string) {
    this.isLoading = true;
    this.isError = false;
    this.errorMessage = undefined;

    try {
      const locations = await geolocationService.search(query);

      runInAction(() => {
        this.locations = locations;
      });
    } catch (e) {
      runInAction(() => {
        this.isError = true;
        this.errorMessage =
          e instanceof Error ? e.message : 'Unknow error has happened.';
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}
