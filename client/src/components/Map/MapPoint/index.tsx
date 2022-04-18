import React, { useRef, useState } from 'react';
import { Marker, Popup } from 'react-leaflet';
import Bank from '../../../redux/interfaces/Bank';
import { getIconUrl, getMapMarkerIcon } from '../../../utils/leaflet-icon-helpers';
import MapPopupContent from '../MapPopupContent';

interface MapPointProps {
  point: Bank;
}

const MapBankPoint = (props: MapPointProps) => {
  const { point } = props;

  const localStorageValue = localStorage.getItem(point.Branch_Code);
  const [isFaivorite, setIsFaivorite] = useState(localStorageValue !== null);

  const markerRef = useRef(null);
  const popupRef = useRef(null);

  const setNewMarkerProps = (color: string) => {
    //@ts-ignore
    markerRef.current._icon.src = getIconUrl(color);

    //@ts-ignore
    popupRef.current._closeButton.click();
  };

  const handleSaveToFaviorite = () => {
    setNewMarkerProps('green');
    localStorage.setItem(point.Branch_Code, 'saved');
    setIsFaivorite(true);
  };

  const handleRemoveFromFaviorite = () => {
    setNewMarkerProps('blue');
    localStorage.removeItem(point.Branch_Code);
    setIsFaivorite(false);
  };

  return (
    <Marker
      ref={markerRef}
      icon={getMapMarkerIcon(isFaivorite ? 'green' : 'blue')}
      position={point.location.coordinates}
    >
      <Popup ref={popupRef}>
        <MapPopupContent
          isFaivorite={isFaivorite}
          handleRemoveFromFaviorite={handleRemoveFromFaviorite}
          handleSaveToFaviorite={handleSaveToFaviorite}
          bank={point}
        />
      </Popup>
    </Marker>
  );
};

export default MapBankPoint;
