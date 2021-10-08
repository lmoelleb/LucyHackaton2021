export abstract class Service {
  protected async request<T>(
    endpoint: string,
    params: Record<string, string | number>
  ): Promise<T> {
    params.appid = process.env.REACT_APP_WEATHER_API_KEY as string;

    const paramsString = Object.entries(params)
      .map(
        ([key, value]) =>
          encodeURIComponent(key) + '=' + encodeURIComponent(value)
      )
      .join('&');

    const url = `${process.env.REACT_APP_WEATHER_API_SERVICE}${endpoint}?${paramsString}`;

    const response = await fetch(url);

    if (!response.ok) {
      console.log('errr');
      throw new Error('Invalid API response.');
    }

    try {
      const data = (await response.json()) as T;

      return data;
    } catch (e) {
      throw new Error('Invalid API response (2).');
    }
  }
}
