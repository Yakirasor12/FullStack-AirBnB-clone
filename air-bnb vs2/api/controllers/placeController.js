const fs = require('fs');
const path = require('path');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const Place = require('../models/Place');


exports.photosMiddleware = multer({ dest: 'uploads/' }) ;

exports.uploadByLink = async (req, res) => {
    const { link } = req.body

    const newName = 'photo' + Date.now() + '.jpg';
    await imageDownloader.image({
        url: link,
        dest: __dirname + '/uploads/' + newName,
    });
    res.json(newName)
};

exports.uploadPhotos = (req, res) => {
    const uploadedFiles = []
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i]
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1]
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath)
        uploadedFiles.push(newPath.replace('uploads\\', ''))
    }
    res.json(uploadedFiles)

};

exports.createPlace = async (req, res) => {
    const { token } = req.cookies;
    const { title, address, addedPhotos, description,
        perks, extraInfo, checkIn, checkOut, maxGuests, price } = req.body
    jwt.verify(token, jwbSecret, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.create({
            owner: userData.id,
            title, address, photos: addedPhotos, description,
            perks, extraInfo, checkIn, checkOut, maxGuests, price
        });
        res.json(placeDoc)
    });
};

exports.getUserPlaces = async (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwbSecret, {}, async (err, userData) => {
        const { id } = userData;
        const userPlaces = await Place.find({owner:id})
        try {
         res.json(await Place.find({ owner: id }));
        } catch (error) {
            res.json(error)
        }
    })
};

exports.getPlaceById = async (req, res) => {
    const { id } = req.params
    res.json(await Place.findById(id))
};

exports.updatePlace = async (req, res) => {
    const { token } = req.cookies;
    const { id, title, address, addedPhotos, description,
        perks, extraInfo, checkIn, checkOut, maxGuests, price } = req.body
    jwt.verify(token, jwbSecret, {}, async (err, userData) => {
        const placeDoc = await Place.findById(id)
        if (userData.id === placeDoc.owner.toString()) {
            placeDoc.set({
                title, address, photos: addedPhotos, description,
                perks, extraInfo, checkIn, checkOut, maxGuests, price
            })
            await placeDoc.save();
            res.json('ok')
        }
    })
};

exports.getAllPlaces = async (req, res) => {
    res.json(await Place.find())
};
