import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';

function App() {
  const [userLocation, setUserLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  const onDisplayLocation = () => {
    navigator.geolocation.getCurrentPosition(setNewUserLocation);
  };

  const setNewUserLocation = (position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords;
    setUserLocation({ latitude, longitude });
  };

  const userApprovedLocation = () => {
    return userLocation.latitude !== 0 && userLocation.longitude !== 0;
  };

  const displayUserLocation = () => {
    return (
      <div style={{ marginTop: '2rem' }}>
        {Object.entries(userLocation).map(([key, value], index) => (
          <span key={index}>
            {key + ' : ' + value} <br />{' '}
          </span>
        ))}
      </div>
    );
  };
  return (
    <div className='App'>
      <button onClick={onDisplayLocation}>Show My Location</button>
      <div>{userApprovedLocation() && displayUserLocation()}</div>
      <div>
        {userApprovedLocation() && (
          <Link
            type='button'
            to={`/banks/${userLocation.longitude}/${userLocation.latitude}`}
          >
            <button style={{ marginTop: '2rem' }} type='button'>
              Search banks around me!
            </button>
          </Link>
        )}
      </div>
      <Outlet />
    </div>
  );
}

export default App;
