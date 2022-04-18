import React from 'react';
import { bankTableHeaders } from '../../../utils/constants';

const BankDetails = (props) => {
  const { bank } = props;
  return (
    <div>
      {bankTableHeaders.map((header, index) => {
        let value = bank[header];
        if (!value) {
          if (header === 'Address') {
            value = bank.Branch_Address + bank.City;
          }
          if (header === 'Distance') {
            value = bank.location.distanceFromUser;
          }
        }

        return (
          <span key={index}>
            <b> {header}</b> : {value} <br />{' '}
          </span>
        );
      })}
    </div>
  );
};

export default BankDetails;
