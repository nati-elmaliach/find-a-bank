import React from 'react';
import Button from '../SharedComponents/Button';
import './index.css';

interface HeaderProps {
  onButtonClick: () => void;
}

const Header = (props: HeaderProps) => {
  return (
    <header>
      <div className='overlay'>
        <h1>Find A Bank!</h1>
        <h3>Finding a bank was never so easy.</h3>
        <p>
          Finding a bank near you should be a very easy task, In just two simple
          steps we can find you a bank around your current location. <br />
          so it dosent matter where you are we got a bank for you!
        </p>
        <br />
        <Button
          onButtonClick={props.onButtonClick}
          text='Step#1 Get my Location'
        />
      </div>
    </header>
  );
};

export default Header;
