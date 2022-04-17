import React from 'react';
import "./index.css"
interface BestBankHeaderProps {
  bankName: string;
  onClick: () => void;
}

const BestBankHeader = (props: BestBankHeaderProps) => {
  return (
    <div className='gradient-multiline hover-div' onClick={props.onClick}>
      <h4>{props.bankName}</h4>
      <h5>This is the bank with the best branch layout!</h5>
      <h6>
        Click here to toggle the filter and display only those banks around you!
      </h6>
    </div>
  );
};

export default BestBankHeader;
