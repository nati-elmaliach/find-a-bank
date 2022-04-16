import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import CoordinatesDisplay from '../components/CoordinatesDisplay';
import Button from '../components/SharedComponents/Button';
import {
  setUserLocation,
  selectUserLocationIsSet,
  selectUserLocation,
} from '../redux/appSlice';
import { useAppDispatch } from '../redux/hooks';

const Home = () => {
  const userLocation = useSelector(selectUserLocation);
  const userLocationIsSet = useSelector(selectUserLocationIsSet);
  const dispatch = useAppDispatch();

  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [userDenied, setUserDenied] = useState(false);

  const onDisplayLocationClick = () => {
    setIsFetchingLocation(true);
    navigator.geolocation.getCurrentPosition(
      setNewUserLocation,
      handleGetUserLocationError
    );
  };

  const setNewUserLocation = (position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords;
    dispatch(setUserLocation({ latitude, longitude }));
    setIsFetchingLocation(false);
  };

  const handleGetUserLocationError = (error: GeolocationPositionError) => {
    // There is no reason for this call to fail on modern browsers...
    setIsFetchingLocation(false);
    setUserDenied(true);
  };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Header onButtonClick={onDisplayLocationClick} />
      <CoordinatesDisplay
        isFetchingLocation={isFetchingLocation}
        userLocation={userLocation}
        userDenied={userDenied}
      />
      {userLocationIsSet && (
        <Button
          text='Step#2 Find me a bank!'
          onButtonClick={() => {}}
          style={{ marginTop: '1rem', background: '#fd5e086b' }}
          navigateTo={'/banks-near-me'}
        />
      )}
    </div>
  );
};

export default Home;
