const Audiobook = require('../models/audiobook');

const getAllAudiobooks = async (req, res) => {
  try {
    const audiobooks = await Audiobook.find();
    res.json(audiobooks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAudiobookById = async (req, res) => {
  try {
    const audiobook = await Audiobook.findById(req.params.id);
    if (audiobook) {
      res.json(audiobook);
    } else {
      res.status(404).json({ message: 'Audiobook not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createAudiobook = async (req, res) => {
  const { title, author, narrator, length, tag, description,coverImage, audioFileURL } = req.body;

  try {
    let tags = tag.split(" ");
    const newAudiobook = new Audiobook({
      title,
      author,
      narrator,
      length,
      tags,
      description,
      coverImage,
      audioFileURL,
    });

    const savedAudiobook = await newAudiobook.save();
    res.status(201).json(savedAudiobook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateAudiobook = async (req, res) => {

  try {
    const audiobook = await Audiobook.findByIdAndUpdate(req.params.id,req.body);
    if (!audiobook) {
      return res.status(404).json({ message: 'Audiobook not found' });
    }

    res.json({message : "Data updated"});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteAudiobook = async (req, res) => {
  try {
    const audiobook = await Audiobook.findById(req.params.id);
    if (!audiobook) {
      return res.status(404).json({ message: 'Audiobook not found' });
    }

    await Audiobook.deleteOne({_id :req.params.id});
    res.json({ message: 'Audiobook deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllAudiobooks,
  getAudiobookById,
  createAudiobook,
  updateAudiobook,
  deleteAudiobook,
};
