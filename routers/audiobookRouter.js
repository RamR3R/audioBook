const express = require('express');
const abRouter = express.Router();
const AudiobookController = require('../controllers/audiobookController.js');


abRouter.get('/', AudiobookController.getAllAudiobooks);
abRouter.get('/:id', AudiobookController.getAudiobookById);
abRouter.post('/', AudiobookController.createAudiobook);
abRouter.patch('/:id', AudiobookController.updateAudiobook);
abRouter.delete('/:id', AudiobookController.deleteAudiobook);

module.exports = abRouter;