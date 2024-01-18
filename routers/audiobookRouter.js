const express = require('express');
const abRouter = express.Router();
const AudiobookController = require('../controllers/audiobookController.js');
const authenticateUser = require('../middleware/auth.js');


abRouter.get('/', AudiobookController.getAllAudiobooks);
abRouter.get('/:id', AudiobookController.getAudiobookById);
abRouter.post('/', authenticateUser,AudiobookController.createAudiobook);
abRouter.patch('/:id',authenticateUser, AudiobookController.updateAudiobook);
abRouter.delete('/:id', authenticateUser,AudiobookController.deleteAudiobook);

module.exports = abRouter;