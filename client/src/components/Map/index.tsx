import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useSelector } from 'react-redux';
import { selectBanks, selectUserCoordinates } from '../../redux/appSlice';
import { getMapMarkerIcon } from '../../utils/getBankPopup';
import MapBankPoint from './MapPoint';

const Map = () => {
  const userCoords = useSelector(selectUserCoordinates);
  const banks = useSelector(selectBanks);

  return (
    <MapContainer
      center={userCoords}
      zoom={14}
      style={{ height: '80vh', width: '80wh', marginTop: '5rem' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker icon={getMapMarkerIcon('red')} position={userCoords}>
        <Popup>You are here!</Popup>
      </Marker>
      {banks.map((bank , index) => (
        <MapBankPoint point={bank} key={index} />
      ))}
    </MapContainer>
  );
};

export default Map;
