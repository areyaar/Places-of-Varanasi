const express = require('express');
const router = express.Router();
const places = require('../controllers/places');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validatePlace } = require('../middleware');

const Place = require('../models/place.js');

router.get('/', catchAsync(places.index));

router.get('/new', isLoggedIn, places.newForm)

router.post('/', isLoggedIn, validatePlace, catchAsync(places.createPlace))

router.get('/:id', catchAsync(places.showPlace));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(places.editForm));

router.put('/:id', isLoggedIn, isAuthor, validatePlace, catchAsync(places.editPlace));

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(places.deletePlace));

module.exports = router;