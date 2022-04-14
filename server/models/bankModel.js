const mongoose = require('mongoose');

const banksSchema = new mongoose.Schema({
  Bank_Code: String,
  Bank_Name: String,
  Branch_Code: String,
  Branch_Name: String,
  Branch_Address: String,
  City: String,
  Zip_Code: String,
  POB: String,
  Telephone: String,
  Fax: String,
  Free_Tel: String,
  Handicap_Access: String,
  day_closed: String,
  Branch_Type: String,
  Date_Open: String,
  Date_Closed: String,
  Merge_Bank: String,
  Merge_Branch: String,
  location: {
    //GeoJSON
    type: {
      type: String,
      default: 'Point',
      enum: ['Point'],
    },
    coordinates: [Number], // [lng , lat]
  },
});

banksSchema.index({ location: '2dsphere' });

const Bank = mongoose.model('Bank', banksSchema);

module.exports = Bank;
