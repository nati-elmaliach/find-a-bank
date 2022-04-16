import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

interface ButtonProps {
  text: string;
  onButtonClick: () => void;
  style?: {};
  navigateTo?: string;
}
const Button = (props: ButtonProps) => {

  if (props.navigateTo) {
    return (
      <Link to={props.navigateTo}>
        <button style={{ ...props?.style }} onClick={props.onButtonClick}>
          {props.text}
        </button>
      </Link>
    );
  }

  return (
    <button style={{ ...props?.style }} onClick={props.onButtonClick}>
      {props.text}
    </button>
  );
};

export default Button;
