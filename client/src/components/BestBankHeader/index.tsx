import React from 'react';
import "./index.css"
interface BestBankHeaderProps {
  bankName: string;
  onClick: () => void;
}

const BestBankHeader = (props: BestBankHeaderProps) => {
  return (
    <div className='gradient-multiline hover-div' onClick={props.onClick}>
      <h3 style={{marginBottom: ".5rem"}}>{props.bankName}</h3>
      <h4>This is the bank with the best branch layout.</h4>
      <h5>
        Click this section to toggle the filter and display only those banks around you!
      </h5>
    </div>
  );
};

export default BestBankHeader;
