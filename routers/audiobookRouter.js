const express = require('express');
const abRouter = express.Router();
const AudiobookController = require('../controllers/audiobookController.js');
const authenticateUser = require('../middleware/auth.js');
const upload = require('../middleware/upload.js');


abRouter.get('/', AudiobookController.getAllAudiobooks);
abRouter.get('/:id', AudiobookController.getAudiobookById);
abRouter.post('/', authenticateUser,upload.single('audio'),AudiobookController.createAudiobook);
abRouter.patch('/:id',authenticateUser, AudiobookController.updateAudiobook);
abRouter.delete('/:id', authenticateUser,AudiobookController.deleteAudiobook);

module.exports = abRouter;