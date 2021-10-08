import { LocationModel } from 'models';
import { Service } from './service';

class GeolocationService extends Service {
  public async search(query: string, limit = 5): Promise<LocationModel[]> {
    const data = await this.request<LocationModel[]>('geo/1.0/direct', {
      q: query,
      limit,
    });

    return data.map((location) => LocationModel.fromJSON(location));
  }
}

export const geolocationService = new GeolocationService();
