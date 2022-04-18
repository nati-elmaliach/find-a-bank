import { Icon } from 'leaflet';

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
