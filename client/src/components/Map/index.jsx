import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useSelector } from 'react-redux';
import { selectUserCoordinates } from '../../redux/appSlice';
import { getMapMarkerIcon } from '../../utils/getBankPopup';
import MapBankPoint from './MapPoint';

const Map = ({ banks }) => {
  const userCoords = useSelector(selectUserCoordinates);

  return (
    <MapContainer
      center={userCoords}
      zoom={13}
      style={{ height: '90vh', width: '80wh' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker icon={getMapMarkerIcon('red')} position={userCoords}>
        <Popup>You are here!</Popup>
      </Marker>
      {banks.map((bank, index) => (
        <MapBankPoint point={bank} key={index} />
      ))}
    </MapContainer>
  );
};

export default Map;
