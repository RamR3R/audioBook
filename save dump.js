const Audiobook = require('../models/audiobook');
const multer = require('multer');

// Multer configuration for handling file uploads
const storage = multer.memoryStorage(); // You can adjust the storage strategy based on your needs
const upload = multer({ storage: storage });

const createAudiobook = async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  const { title, author, narrator, length, tag, description , audiofileurl} = req.body;

  try {
    // Check if required fields are present
    if (!title || !author || !narrator || !length || !tag || !description || !audiofileurl) {
      
      return res.status(400).json({ message: 'Missing required fields' });
    }

    let tags = tag.split(" ");
    console.log(tags);

    // Handle file upload
    // const audioFile = 'https://file-examples.com/storage/fe5048eb7365a64ba96daa9/2017/11/file_example_MP3_700KB.mp3'; 
    // Assuming the file is sent in the 'audio' field of the request

    // Check if audio file is present
    // if (!audioFile) {
    //   return res.status(400).json({ message: 'No audio file uploaded' });
    // }

    // const audioFileName = `${Date.now()}_${audioFile.originalname}`;
    // const audiofileurl = audioFile;
    const newAudiobook = new Audiobook({
      title,
      author,
      narrator,
      length,
      tags,
      description,
      audiofileurl
    });

    await newAudiobook.save();

    res.status(201).json({ message: 'Audiobook created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add the 'upload.single('audio')' middleware to handle the file upload
const updateAudiobook = [upload.single('audio'), async (req, res) => {
  const audiobookId = req.params.id;
  const { title, author, narrator, length, categories, description } = req.body;

  try {
    const audiobook = await Audiobook.findById(audiobookId);

    if (!audiobook) {
      return res.status(404).json({ message: 'Audiobook not found' });
    }

    // Handle file upload if a new audio file is provided
    const newAudioFile = req.file;
    if (newAudioFile) {
      // Process the new audio file and update the filename
      const newAudioFileName = `${Date.now()}_${newAudioFile.originalname}`;
      // Update the audiobook with the new audio file information
      audiobook.audioFileName = newAudioFileName;
    }

    // Update other fields
    audiobook.title = title;
    audiobook.author = author;
    audiobook.narrator = narrator;
    audiobook.length = length;
    audiobook.categories = categories;
    audiobook.description = description;

    await audiobook.save();

    res.json({ message: 'Audiobook updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}];

const deleteAudiobook = async (req, res) => {
  const audiobookId = req.params.id;

  try {
    const audiobook = await Audiobook.findById(audiobookId);

    if (!audiobook) {
      return res.status(404).json({ message: 'Audiobook not found' });
    }

    // Handle audio file cleanup or removal logic if needed

    await audiobook.remove();

    res.json({ message: 'Audiobook deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAudiobook,
  updateAudiobook,
  deleteAudiobook,
};
