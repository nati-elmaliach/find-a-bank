import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Icon } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import { getDistanceFromLatLonInKm } from './utils/helpers';

const BanksMap = () => {
  const { lng, lat } = useParams();
  const [banks, setBanks] = useState([]);
  const userCoords = [Number(lat), Number(lng)];

  useEffect(() => {
    fetchCloseBanks();
  }, []);

  const fetchCloseBanks = async () => {
    const [lat, lng] = userCoords;

    let url = `/api/bank/near/${lat}/${lng}`;
    if (process.env.NODE_ENV === 'development') {
      url = 'http://localhost:5000' + url;
    }
    
    const banks = await axios.get(url);
    setBanks(banks.data);
  };

  const saveBankToFavorite = (branchCode) => {
    localStorage.setItem(branchCode, 'saved');
  };

  const getBankPopup = (bank) => {
    const { Bank_Name, Branch_Address, Branch_Name } = bank;
    const [bankLng, bankLat] = bank.location.coordinates;

    const [userLng, userLat] = userCoords;

    const distance = getDistanceFromLatLonInKm(
      bankLat,
      bankLng,
      userLat,
      userLng
    );
    return (
      <Popup>
        {Bank_Name}, {Branch_Address}, {Branch_Name} <br />
        {distance}Km
        <br />
        <button onClick={() => saveBankToFavorite(bank.Branch_Code)}>
          Save!
        </button>
      </Popup>
    );
  };

  const getBankMarker = (bank, index) => {
    const otherProps = {};
    const { Branch_Code } = bank;
    if (localStorage.getItem(Branch_Code)) {
      otherProps.icon = new Icon({
        iconUrl:
          'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl:
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });
    }

    return (
      <Marker
        {...otherProps}
        key={index}
        position={bank.location.coordinates.reverse()}
      >
        {getBankPopup(bank)}
      </Marker>
    );
  };

  return (  
    <MapContainer
      center={userCoords}
      zoom={14}
      style={{ height: '80vh', width: '80wh', margin: '2rem' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker
        icon={
          new Icon({
            iconUrl:
              'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
            shadowUrl:
              'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
          })
        }
        position={userCoords}
      >
        <Popup>You are here!</Popup>
      </Marker>
      {banks.map((bank, index) => getBankMarker(bank, index))}
    </MapContainer>
  );
};

export default BanksMap;
