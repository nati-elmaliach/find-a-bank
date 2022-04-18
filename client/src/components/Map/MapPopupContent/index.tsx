import React from 'react';
import Bank from '../../../redux/interfaces/Bank';
import Button from '../../SharedComponents/Button';
import BankDetails from '../BankDetails';

import './index.css';

interface MapPopupProps {
  isFaivorite: boolean;
  handleSaveToFaviorite: () => void;
  handleRemoveFromFaviorite: () => void;
  bank: Bank;
}

const MapPopupContent = (props: MapPopupProps) => {
  const { isFaivorite } = props;

  const getButtonConfig = () => {
    if (!isFaivorite) {
      return {
        text: 'Save to favirote',
        onButtonClick: () => props.handleSaveToFaviorite(),
      };
    }

    return {
      text: 'Remove From favirotes',
      onButtonClick: () => props.handleRemoveFromFaviorite(),
    };
  };

  return (
    <div className='map-popup-content-div'>
      <BankDetails bank={props.bank} />
      <Button
        style={{
          margin: '.5rem',
          color: '#9f05ff69',
          background: 'orange',
        }}
        {...getButtonConfig()}
      />
    </div>
  );
};

export default MapPopupContent;
