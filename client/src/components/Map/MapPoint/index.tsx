import React, { useRef } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { useSelector } from 'react-redux';
import { selectUserCoordinates } from '../../../redux/appSlice';
import Bank from '../../../redux/Bank';
import {
  getBankPopup,
  getIconUrl,
  getMapMarkerIcon,
} from '../../../utils/getBankPopup';
import Button from '../../SharedComponents/Button';

interface MapPointProps {
  point: Bank;
}

const MapBankPoint = (props: MapPointProps) => {
  const userCoords = useSelector(selectUserCoordinates);
  const markerRef = useRef(null);
  const popupRef = useRef(null);

  const { point } = props;
  const isFaivorite = localStorage.getItem(point.Branch_Code);

  const setNewMarkerProps = (color: string) => {
    //@ts-ignore
    markerRef.current._icon.src = getIconUrl(color);

    //@ts-ignore
    popupRef.current._closeButton.click();
  };

  const handleSaveToFaviorite = () => {
    localStorage.setItem(point.Branch_Code, 'saved');
    setNewMarkerProps('green');
  };

  const handleRemoveFromFaviorite = () => {
    localStorage.removeItem(point.Branch_Code);
    setNewMarkerProps('blue');
  };

  const getButtonConfig = () => {
    if (!isFaivorite) {
      return {
        text: 'Save to favirote',
        onButtonClick: () => handleSaveToFaviorite(),
      };
    }

    return {
      text: 'Remove From favirotes',
      onButtonClick: () => handleRemoveFromFaviorite(),
    };
  };

  const getPopupContent = () => {
    return (
      <div
        style={{
          width: '15rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {getBankPopup(userCoords, point)}
        <Button
          style={{
            marginBottom: '5px',
            color: '#9f05ff69',
            background: 'orange',
          }}
          {...getButtonConfig()}
        />
      </div>
    );
  };

  return (
    <Marker
      ref={markerRef}
      icon={getMapMarkerIcon(isFaivorite ? 'green' : 'blue')}
      position={point.location.coordinates}
    >
      <Popup ref={popupRef}>{getPopupContent()}</Popup>
    </Marker>
  );
};

export default MapBankPoint;