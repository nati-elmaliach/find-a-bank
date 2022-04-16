import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Map from '../components/Map';
import Spinner from '../components/SharedComponents/Spinner';

import {
  fetchBanks,
  selectIsFetchingBanks,
  
} from '../redux/appSlice';

const Banks = () => {
  const isFetching = useSelector(selectIsFetchingBanks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBanks());
  }, []);

  return (
    <div>
      <div style={{ height: '5vh', textAlign: 'center' }}>
        {isFetching && <Spinner />}
      </div>
      <Map />
    </div>
  );
};

export default Banks;
