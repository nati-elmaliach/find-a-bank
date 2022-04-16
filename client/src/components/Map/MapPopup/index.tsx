import React from 'react';
import { Popup } from 'react-leaflet';

interface MapPopupProps {
  content: any
}

const MapPopup = (props: MapPopupProps) => {
  return <Popup >{props.content}</Popup>
};

export default MapPopup;