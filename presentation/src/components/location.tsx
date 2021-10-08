import { LocationModel } from 'models';
import Flag from 'react-flagkit';

import './location.css';

type LocationProps = {
  for: LocationModel;
};

export const Location: React.FC<LocationProps> = ({ for: location }) => {
  return (
    <span className="location">
      <Flag country={location.country} /> {location.name}
    </span>
  );
};
