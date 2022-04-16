const path = require('path');
const xlsx = require('node-xlsx');
const Bank = require('../models/bankModel');

function convertToArray(array) {
  const first = array[0].join();
  const headers = first.split(',');

  const jsonData = [];
  for (let i = 1, length = array.length; i < length; i++) {
    const myRow = array[i].join();
    const row = myRow.split(',');

    const data = {};
    for (let x = 0; x < row.length; x++) {
      data[headers[x]] = row[x];
    }
    jsonData.push(data);
  }
  return jsonData;
}

function filterBanks(bank) {
  // Avoid saving banks with incorrct coordinates, we cannot show them...
  const { X_Coordinate, Y_Coordinate } = bank;
  if (X_Coordinate === '' || Y_Coordinate === '') {
    return false;
  }

  if (X_Coordinate > 180 || Y_Coordinate > 180) {
    return false;
  }

  return true;
}

function mapBanksToDbEntity(bank) {
  const { X_Coordinate, Y_Coordinate, ...data } = bank;
  const cordA = Number(X_Coordinate);
  const cordB = Number(Y_Coordinate);
  const coordinates = [];

  // Valid coordinate
  if (cordB < cordA) {
    coordinates.push(cordA, cordB);
  } else {
    // Coordinate is not valid, lng and lat is reverse
    coordinates.push(cordB, cordA);
  }

  const location = { type: 'Point', coordinates };
  data.location = location;

  return data;
}

function excelToJSON() {
  const filePath = path.join(__dirname, '..', 'snifim_heboi.org.il.xlsx');
  const object = xlsx.parse(filePath);
  const allBanks = convertToArray(object[0].data);

  return allBanks.filter(filterBanks).map(mapBanksToDbEntity);
}

async function shouldPopulateDb() {
  const anyBank = await Bank.findOne();
  return anyBank === null;
}

async function populateDb() {
  // Only populate if database is empty, not the best case but it should work
  const populate = await shouldPopulateDb();

  if (populate) { 
    console.log("Database is empty, populating....");
    
    const banksToInsert = excelToJSON();
    await Bank.insertMany(banksToInsert);
  }
}

module.exports = populateDb;
