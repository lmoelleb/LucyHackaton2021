type ILocationModelSerialized = {
  name: string;
  lat: number;
  lon: number;
  country: string;
};

export class LocationModel {
  constructor(
    public readonly name: string,
    public readonly lat: number,
    public readonly lon: number,
    public readonly country: string
  ) {}

  public toJSON(): ILocationModelSerialized {
    return {
      name: this.name,
      lat: this.lat,
      lon: this.lon,
      country: this.country,
    };
  }

  public static fromJSON(data: ILocationModelSerialized): LocationModel {
    return new LocationModel(data.name, data.lat, data.lon, data.country);
  }
}
