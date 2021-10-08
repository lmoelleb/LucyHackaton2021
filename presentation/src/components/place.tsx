import { Button } from 'antd';
import { Location } from 'components';
import { observer } from 'mobx-react-lite';
import { useWeatherController } from 'providers';

export const Place: React.FC = observer(() => {
  const weatherController = useWeatherController();

  if (!weatherController.location) return null;

  return (
    <div>
      You are here: <Location for={weatherController.location} />{' '}
      <Button size="small" onClick={weatherController.cleanLocation}>
        Change
      </Button>
    </div>
  );
});
