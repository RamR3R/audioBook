const Audiobook = require('../models/audiobook');
const upload = require('../middleware/upload');

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
  let { title, author, narrator, length, tags, description,coverImage, audioFileURL } = req.body;
  console.log(req.body);
  console.log(req.file);
  console.log(req.user.id)
  tags = tags.split(" ");
  let uploadedBy = req.user.id;
  let audioFile = {
    name : req.file.originalname,
    audio : {
      data : req.file.filename,
      contentType : 'audio/mpeg'
    }
  };
  try {
    const newAudiobook = new Audiobook({
      title,
      author,
      narrator,
      length,
      tags,
      description,
      coverImage,
      audioFileURL,
      audioFile,
      uploadedBy
    });

    const savedAudiobook = await newAudiobook.save();
    res.status(201).json(savedAudiobook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateAudiobook = async (req, res) => {

  try {
    let userCheck = await Audiobook.findById(req.params.id);
    if (!userCheck) {
      res.status(404).json({ message: 'Audiobook not found' });
    }
    if(req.user.id != userCheck.uploadedBy){
      console.log(req.user.id , userCheck.uploadedBy+"");
      res.status(401).json({message : "This audio book doesn't belong to you. You can edit your own books"});
    }
    else
    {
      console.log(req.body);
      let audiobook = await Audiobook.findByIdAndUpdate(req.params.id,req.body);
      res.json({message : "Data updated", data : audiobook});
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteAudiobook = async (req, res) => {
  try {
    let userCheck = await Audiobook.findById(req.params.id);
    if (!userCheck) {
      return res.status(404).json({ message: 'Audiobook not found' });
    }
    if(req.user.id != userCheck.uploadedBy)
    {
      console.log(req.user.id , userCheck.uploadedBy+"");
      res.status(401).json({message : "This audio book doesn't belong to you. You cannot delete it."});
    }
    else
    {
      let audiobook = await Audiobook.deleteOne({_id:req.params.id});
      res.json({ message: 'Audiobook deleted successfully', data : audiobook });
    }
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
