import { Icon } from 'leaflet';
import React from 'react';
import { Marker } from 'react-leaflet';
import Bank from '../../../redux/Bank';
import { arrayOf2 } from '../../../utils/constants';
import MapPopup from '../MapPopup';

interface MapMarkerProps {
  markerPosition: arrayOf2;
  icon: Icon;
  popupContent: any;
}

const MapMarker = (props: MapMarkerProps) => {
  const { markerPosition, icon, popupContent } = props;
  return (
    <Marker icon={icon} position={markerPosition}>
      <MapPopup content={popupContent} />
    </Marker>
  );
};

export default MapMarker;
