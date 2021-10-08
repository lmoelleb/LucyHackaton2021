import { Alert, Input } from 'antd';
import { LocationsController } from 'controllers';
import { observer } from 'mobx-react-lite';
import { LocationModel } from 'models';
import { useWeatherController } from 'providers';
import { useCallback, useState } from 'react';
import Flag from 'react-flagkit';

export const PlaceSelector: React.FC = observer(() => {
  const [placeController] = useState(() => new LocationsController());
  const weatherController = useWeatherController();

  const changeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      placeController.search(e.target.value);
    },
    [placeController]
  );

  const setLocation = useCallback(
    (location: LocationModel) => {
      weatherController.setLocation(location);
    },
    [weatherController]
  );

  return (
    <>
      <Input.Search
        allowClear
        placeholder="Search your place"
        enterButton="Search"
        size="large"
        onChange={changeHandler}
        loading={placeController.isLoading}
      />

      {placeController.isError && (
        <Alert type="error" message={placeController.errorMessage} />
      )}

      {placeController.locations.length > 0 && (
        <>
          {placeController.locations.map((location) => (
            <div className="location" onClick={() => setLocation(location)}>
              <span className="location__flag">
                <Flag country={location.country} />
              </span>
              <span className="location__name">{location.name}</span>
            </div>
          ))}
        </>
      )}
    </>
  );
});
