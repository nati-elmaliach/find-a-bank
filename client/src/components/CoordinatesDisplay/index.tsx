import React from 'react';
import { PointOnEarth } from '../../utils/constants';
import Spinner from '../SharedComponents/Spinner';
import Table from '../SharedComponents/Table';

interface CoordinatesDisplayProps {
  userLocation: PointOnEarth;
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

    return (
      <Table
        caption='Great, Your Coordinates Are: '
        headers={['Longitude', 'Latitude']}
        rows={[[longitude, latitude]]}
      />
    );
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
