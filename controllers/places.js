const Place = require('../models/place.js');


module.exports.index = async (req, res) => {
    const places = await Place.find({});
    res.render('places/index', { places })
    //console.log(places);
}
module.exports.newForm = (req, res) => {
    res.render('places/new');
}
module.exports.editForm = async (req, res) => {
    const { id } = req.params;
    const place = await Place.findById(id)
    if (!place) {
        req.flash('error', 'Cannot find that place!');
        return res.redirect('/places');
    }
    res.render('places/edit', { place });
}

module.exports.createPlace = async (req, res, next) => {
    const place = new Place(req.body.place);
    place.author = req.user._id;
    await place.save();
    req.flash('success', 'Successfully made a new place!');
    res.redirect(`/places/${place._id}`)
}
module.exports.editPlace = async (req, res) => {
    const { id } = req.params;
    const place = await Place.findByIdAndUpdate(id, { ...req.body.place });
    req.flash('success', 'Successfully updated place!');
    res.redirect(`/places/${place._id}`)
}
module.exports.deletePlace = async (req, res) => {
    const { id } = req.params;
    await Place.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted place')
    res.redirect('/places');
}

module.exports.showPlace = async (req, res,) => {
    const place = await Place.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    //console.log(place);
    if (!place) {
        req.flash('error', 'Cannot find that place!');
        return res.redirect('/places');
    }
    res.render('places/show', { place });
}
