import Bank from '../redux/interfaces/Bank';
import { PointOnEarth } from './constants';

const DEFAULT_DISTANCE_FROM_USER = 7;

export function getDistanceFromLatLonInKm(
  point1: PointOnEarth,
  point2: PointOnEarth
) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(point1.latitude - point2.latitude); // deg2rad below
  var dLon = deg2rad(point1.longitude - point2.longitude);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(point1.latitude)) *
      Math.cos(deg2rad(point2.latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return Number(d.toFixed(2));
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

export function transformBanksForDisplay(
  userLocation: PointOnEarth,
  banks: Bank[]
) {
  return banks.map((bank) => {
    const banksNewCoords = bank.location.coordinates.reverse();
    const bankLocation = {
      latitude: banksNewCoords[0],
      longitude: banksNewCoords[1],
    };

    const distanceFromUser = getDistanceFromLatLonInKm(
      userLocation,
      bankLocation
    );

    return {
      ...bank,
      location: { coordinates: banksNewCoords, distanceFromUser },
    };
  });
}

interface BanksKeysMapLiteral {
  [key: string]: number;
}


// Count number of occurnces in banksCountMap, maybe it is better to use Bank_Code since Bank_Name can differ?
function getBestBankKey(banksCountMap: BanksKeysMapLiteral) {
  let max = 0;
  let bestKey = '';

  for (let key in banksCountMap) {
    if (banksCountMap[key] > max) {
      max = banksCountMap[key];
      bestKey = key;
    }
  }

  return bestKey;
}

export function calculateBestBranchLayout(banks: Bank[]) {
  const banksCountMap: BanksKeysMapLiteral = {};

  for (let bank of banks) {
    const { Bank_Name, location } = bank;
    if (location.distanceFromUser <= DEFAULT_DISTANCE_FROM_USER) {
      if (banksCountMap[Bank_Name]) {
        banksCountMap[Bank_Name] = banksCountMap[Bank_Name] + 1;
      } else {
        banksCountMap[Bank_Name] = 1;
      }
    }
  }

  return getBestBankKey(banksCountMap);
}
