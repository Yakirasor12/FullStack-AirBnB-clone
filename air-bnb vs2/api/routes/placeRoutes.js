const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { uploadByLink, uploadPhotos, createPlace, getUserPlaces, getPlaceById, updatePlace, getAllPlaces, photosMiddleware } = require('../controllers/placeController');

router.post('/upload-by-link', uploadByLink);
router.post('/upload', photosMiddleware.array('photos', 100) , uploadPhotos);
router.post('/', authMiddleware, createPlace);
router.get('/user-places', authMiddleware, getUserPlaces);
router.get('/:id', getPlaceById);
router.put('/', authMiddleware, updatePlace);
router.get('/', getAllPlaces);

module.exports = router;
