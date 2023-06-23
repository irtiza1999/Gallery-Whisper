import express from 'express';
import { artistInfo, createArtist, allArtistInfo, removeArtist, updateArtist } from '../controllers/artistController.js';

const router = express.Router();
 
router.get('/', allArtistInfo);
router.delete('/', removeArtist);
router.get('/:name', artistInfo);
router.put('/', updateArtist);
router.post('/', createArtist);

export default router;