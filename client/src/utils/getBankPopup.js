import { Icon } from 'leaflet';

const bankTableHeaders = [
  'Bank_Name',
  'Bank_Code',
  'Branch_Name',
  'Branch_Code',
  'Address',
  'day_closed',
  'Distance',
];

export const getBankPopup = (userCoords, bank) => {
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

export const getIconUrl = (color) => {
  return `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`;
};

export const getMapMarkerIcon = (color) => {
  return new Icon({
    iconUrl: getIconUrl(color),
    shadowUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
};
