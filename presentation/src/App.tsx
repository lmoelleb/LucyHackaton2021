import { WeatherStation } from 'containers';
import { WeatherProvider } from 'providers';

import './App.css';

const App: React.FC = () => {
  return (
    <WeatherProvider>
      <div className="main-layout">
        <WeatherStation />
      </div>
    </WeatherProvider>
  );
};

export default App;
