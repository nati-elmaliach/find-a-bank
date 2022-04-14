const path = require('path');
const xlsx = require('node-xlsx');
const Bank = require('../models/bankModel');

function convertToArray(array) {
  var first = array[0].join();
  var headers = first.split(',');

  var jsonData = [];
  for (var i = 1, length = array.length; i < length; i++) {
    var myRow = array[i].join();
    var row = myRow.split(',');

    var data = {};
    for (var x = 0; x < row.length; x++) {
      data[headers[x]] = row[x];
    }
    jsonData.push(data);
  }
  return jsonData;
}

function ExcelToJSON() {
  const filePath = path.join(__dirname, '..', 'snifim_heboi.org.il.xlsx');
  const object = xlsx.parse(filePath);
  const allBanks = convertToArray(object[0].data);
  return allBanks
    .filter((bank) => {
      const { X_Coordinate, Y_Coordinate } = bank;
      // if there are mo coordinates at all...
      if (X_Coordinate === '' || Y_Coordinate === '') {
        return false;
      }

      if (X_Coordinate > 180 || Y_Coordinate > 180) {
        return false;
      }

      return true;
    })
    .map((bank) => {
      const { X_Coordinate, Y_Coordinate, ...data } = bank;

      const suggestedLng = Number(X_Coordinate);
      const suggestedLat = Number(Y_Coordinate);
      const coordinates = [];
      if (suggestedLat > suggestedLng) {
        coordinates.push(suggestedLat, suggestedLng);
      } else {
        coordinates.push(suggestedLng, suggestedLat);
      }

      const location = {
        type: 'Point',
        coordinates: [Number(X_Coordinate), Number(Y_Coordinate)],
      };

      data.location = location;
      return data;
    });
}

async function shouldPopulateDb() {
  const anyBank = await Bank.findOne();
  return anyBank === null;
}

async function populateDb() {
  const populate = await shouldPopulateDb();

  // If there are no banks in our database, then we need to populate
  if (populate) {
    const banksToInsert = ExcelToJSON();
    await Bank.insertMany(banksToInsert);
  }
}

module.exports = populateDb;
