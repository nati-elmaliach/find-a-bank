import React, { useState } from 'react';
import Header from '../components/Header';
import CoordinatesDisplay from '../components/CoordinatesDisplay';
import Button from '../components/SharedComponents/Button';

const Home = () => {
  const [userLocation, setUserLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [userDenied, setUserDenied] = useState(false);

  const onDisplayLocation = () => {
    setIsFetchingLocation(true);
    navigator.geolocation.getCurrentPosition(setNewUserLocation, (error) => {
      setIsFetchingLocation(false);
      setUserDenied(true);
    });
  };

  const setNewUserLocation = (position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords;
    setUserLocation({ latitude, longitude });
    setIsFetchingLocation(false);
  };

  const userApprovedLocation = () => {
    return userLocation.latitude !== 0 && userLocation.longitude !== 0;
  };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Header onButtonClick={onDisplayLocation} />
      <CoordinatesDisplay
        isFetchingLocation={isFetchingLocation}
        userLocation={userLocation}
        userDenied={userDenied}
      />
      {userApprovedLocation() && (
        <Button
          text='Step #2 Find me a bank!'
          onButtonClick={() => {}}
          style={{ marginTop: '1rem' }}
          navigateTo={`/banks/${userLocation.longitude}/${userLocation.latitude}`}
        />
      )}
    </div>
  );
};

export default Home;
