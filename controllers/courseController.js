// courseController.js
const Course = require('../models/courses');
const Audiobook = require('../models/audiobook');

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate(['contents','createdBy']);
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('contents');
    if (course) {
      res.json(course);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCourse = async (req, res) => {
  const { title, instructor, length, description, coverImage, contents } = req.body;

  try {
    // Check if audiobooks exist before creating the course
    let audiobooksExist = await Audiobook.find({ _id: { $in: contents } });
    if (audiobooksExist.length !== contents.length) {
      return res.status(400).json({ message: 'One or more audiobooks do not exist' });
    }
    const createdBy = req.user;

    const newCourse = new Course({
      title,
      instructor,
      length,
      description,
      coverImage,
      contents,
      createdBy: createdBy.id,
    });

    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateCourse = async (req, res) => {

  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if(course.createdBy != req.user.id)
    {
      res.status(401).json({message : "This Course doesn't belong to you. You can edit your own Courses"});
    }
    else{
        if(req.body.contents)
      {      
        // Check if audiobooks exist before updating the course
        let audiobooksExist = await Audiobook.find({ _id: { $in: req.body.contents } });
        if (audiobooksExist.length !== contents.length) {
          return res.status(400).json({ message: 'One or more audiobooks do not exist' });
        }
      }
      const updateCourse = await Course.findByIdAndUpdate(req.params.id,req.body);

      res.json({message : "Course Updated",data: updateCourse});
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if(course.createdBy != req.user.id)
    {
      res.status(401).json({message : "This Course doesn't belong to you. You can edit your own Courses"});
    }
    else
    {
      await Course.deleteOne({_id:req.params.id});
      res.json({ message: 'Course deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
