import { WeatherController } from 'controllers';
import { createContext, useContext, useState } from 'react';

const Context = createContext<WeatherController | undefined>(undefined);

export const WeatherProvider: React.FC = ({ children }) => {
  const [weatherController] = useState(() => new WeatherController());

  return (
    <Context.Provider value={weatherController}>{children}</Context.Provider>
  );
};

export const useWeatherController = (): WeatherController => {
  const context = useContext(Context);
  if (!context) throw new Error('useWeatherController: no context');

  return context;
};
