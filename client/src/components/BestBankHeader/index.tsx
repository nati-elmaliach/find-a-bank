import React from 'react';

import '../Header/index.css';
interface BestBankHeaderProps {
  bankName: string;
  onClick: () => void;
}

const BestBankHeader = (props: BestBankHeaderProps) => {
  return (
    <header onClick={props.onClick}>
      <div
        className='overlay'
        style={{ color: 'cornsilk', padding: '1rem', fontSize: '.8rem' }}
      >
        <h4>{props.bankName}</h4>
        <h5>This is the bank with the best branch layout!</h5>
        <h6>
          Click here to toggle the filter and display only those banks around
          you!
        </h6>
      </div>
    </header>
  );
};

export default BestBankHeader;
