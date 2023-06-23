import express from 'express';
import { artistInfo, createArtist, allArtistInfo, removeArtist } from '../controllers/artistController.js';

const router = express.Router();
 
router.get('/', allArtistInfo);
router.delete('/', removeArtist);
router.get('/:name', artistInfo);
// router.put('/:name', artistInfo);
router.post('/', createArtist);

export default router;