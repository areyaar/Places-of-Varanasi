const Place = require('../models/place.js');


module.exports.index = async (req, res) => {
    const places = await Place.find({});
    res.render('places/index', { places })
    //console.log(places);
}
module.exports.newForm = (req, res) => {
    res.render('places/new');
}
