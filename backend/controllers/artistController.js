import asyncHandler from 'express-async-handler';
import Artist from '../models/artistModel.js';
import Product from '../models/productModel.js';

const artistInfo = asyncHandler(async (req, res) => {
  const name = req.params.name;
  const artist = await Artist.findOne({ name });

  if (!artist) {
    res.json({artist: null});
  } else {
    const artistProducts = await Product.find({ artists: artist.name });

    if (!Array.isArray(artistProducts)) {
      artistProducts = []; // Set to an empty array if it's not already an array
    }
    const filteredProducts = artistProducts.map(product => ({
      product: product
    }));

    res.json({
      artist,
      artistProducts: filteredProducts
    });
  }
});

const createArtist = asyncHandler(async (req, res) => {
    const {name,email,nationality, info, exhibitions} = req.body;
    const artistExists = await Artist.findOne({ name });
    if(artistExists) {
        res.status(400);
        throw new Error('Artist already exists');
    }
    const artist = await Artist.create({
        name,
        email,
        nationality: nationality || '',
        info,
        exhibitions: exhibitions || ''});
    if(artist){
        res.status(201).json({
            _id : artist._id,
            name : artist.name,
            email : artist.email,
            nationality : artist.nationality,
            info : artist.info,
            exhibitions : artist.exhibitions
        });
    }else{
        res.status(400);
        throw new Error('Invalid artist data');
    }
});

const allArtistInfo = asyncHandler(async (req, res) => {
  const artists = await Artist.find({});
  res.json(artists);
});

const removeArtist = asyncHandler(async (req, res) => {
  const userId = req.body.userId;
  const artist = await Artist.findById(userId);
  if (artist) {
    await artist.deleteOne();
    res.json({ message: 'Artist removed' });
  } else {
    res.status(404);
    throw new Error('Artist not found');
  }
});

const updateArtist = asyncHandler(async (req, res) => {
  console.log(req.body)
  const userId = req.body._id;
  const artist = await Artist.findById(userId);
  if (!artist) {
    res.status(404);
    throw new Error('Artist not found');
  }
  artist.name = req.body.name || artist.name;
  artist.email = req.body.email || artist.email;
  artist.nationality = req.body.nationality || artist.nationality;
  artist.info = req.body.info || artist.info;
  artist.exhibitions = req.body.exhibitions || artist.exhibitions;

  const updatedArtist = await artist.save();

  res.json({
    _id: updatedArtist._id,
    name: updatedArtist.name,
    email: updatedArtist.email,
    nationality: updatedArtist.nationality,
    info: updatedArtist.info,
    exhibitions: updatedArtist.exhibitions,
  });
});




export {
    artistInfo,
    createArtist,
    allArtistInfo,
    removeArtist,
    updateArtist
};