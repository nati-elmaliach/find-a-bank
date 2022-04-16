const Bank = require('../models/bankModel');

exports.getBanksNearUser = async (req, res, next) => {
  const { lat, lng } = req.params;
  const coords = [Number(lng), Number(lat)];

  const radius = 10 / 6378.1;
  const banks = await Bank.find({
    location: { $geoWithin: { $centerSphere: [coords, radius] } },
  });

  res.send(banks);
};
