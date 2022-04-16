import React from 'react';
import './index.css';

import { UserLocation } from '../../utils/constants';

interface CoordinatesTableProps {
  location: UserLocation;
}

const CoordinatesTable = (props: CoordinatesTableProps) => {
  return (
    <table>
      <caption>Great, Your Coordinates Are:</caption>
      <thead>
        <tr>
          <th>Longitude</th>
          <th>Latitude</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{props.location.longitude}</td>
          <td>{props.location.latitude}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default CoordinatesTable;
