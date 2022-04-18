import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BestBankHeader from '../components/BestBankHeader';
import Map from '../components/Map';
import Spinner from '../components/SharedComponents/Spinner';
import {
  fetchBanks,
  selectBanks,
  selectIsFetchingBanks,
} from '../redux/appSlice';
import { calculateBestBranchLayout } from '../utils/helpers';

const Banks = () => {
  const isFetching = useSelector(selectIsFetchingBanks);
  const banks = useSelector(selectBanks);
  const bestBankName = calculateBestBranchLayout(banks);

  const [filter, setFilter] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBanks());
  }, []);

  const handleFilterClick = () => {
    if (filter !== '') {
      setFilter('');
      return;
    }
    setFilter(bestBankName);
  };

  const getBanksToDisplay = () => {
    if (filter === '') {
      return banks;
    }
    return banks.filter((bank) => bank.Bank_Name === bestBankName);
  };

  const getPageHeader = () => {
    if (isFetching) {
      return <Spinner />;
    }

    return (
      <BestBankHeader bankName={bestBankName} onClick={handleFilterClick} />
    );
  };

  return (
    <div>
      <div
        style={{
          height: '15vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {getPageHeader()}
        <span className='gradient-multiline'>
          *Tip: You can click on the markers to see more details about the bank{' '}
        </span>
      </div>
      <Map banks={getBanksToDisplay()} />
    </div>
  );
};

export default Banks;
