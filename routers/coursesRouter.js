const express = require('express');
const courseRouter = express.Router();
const CourseController = require('../controllers/courseController.js');
const authenticateUser = require('../middleware/auth.js');

courseRouter.get('/', CourseController.getAllCourses);
courseRouter.get('/:id', CourseController.getCourseById);
courseRouter.post('/',authenticateUser, CourseController.createCourse);
courseRouter.patch('/:id',authenticateUser, CourseController.updateCourse);
courseRouter.delete('/:id', CourseController.deleteCourse);

module.exports = courseRouter;