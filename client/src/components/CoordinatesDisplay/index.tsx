import React from 'react';
import { UserLocation } from '../../utils/constants';
import CoordinatesTable from '../CoordinatesTable';
import Button from '../SharedComponents/Button';
import Spinner from '../SharedComponents/Spinner';

interface CoordinatesDisplayProps {
  userLocation: UserLocation;
  isFetchingLocation: boolean;
  userDenied: boolean;
}

const CoordinatesDisplay = (props: CoordinatesDisplayProps) => {
  const { userLocation, isFetchingLocation, userDenied } = props;

  const { latitude, longitude } = userLocation;

  const getTableView = () => {
    if (isFetchingLocation) {
      return <Spinner />;
    }

    if (userDenied) {
      return <h3>We need to know your location...</h3>;
    }

    if (latitude === 0 || longitude === 0) {
      return null;
    }

    return <CoordinatesTable location={userLocation} />;
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '2rem',
      }}
    >
      {getTableView()}
      
    </div>
  );
};

export default CoordinatesDisplay;
