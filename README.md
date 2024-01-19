# Audio Player App

## Overview

The Audio Player App is an application that provides users with access to audio courses and audiobooks. Users can register, create courses, and explore a variety of audiobooks.

## Features

- User registration and authentication
- CRUD operations for audiobooks
- CRUD operations for courses, associating them with audiobooks
- JWT-based authentication
- API documentation using Swagger

## Prerequisites

- Node.js and npm installed
- MongoDB installed and running

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/RamR3R/audioBook
   ```
   
Certainly! Below is a template for a GitHub README.md file. This template includes sections for project overview, features, prerequisites, installation, usage, API documentation, and contributions. Make sure to adjust the content based on your specific project details.

2. Install dependencies:

```
npm install
```

3. Set up your MongoDB database and update the configuration in env file or ``` ./config/db.js ```

4. Start the server:

```
npm run server
```
# Project Folder Structure

This project follows the Model-View-Controller (MVC) architectural pattern. Below is an overview of the folder structure:
1. Models
1.1 Audiobook.js

    Description:
    Defines the schema for an audiobook.

    Properties:
        title: Title of the audiobook.
        author: Author of the audiobook.
        narrator: Narrator of the audiobook.
        length: Duration of the audiobook.
        tags: Array of tags associated with the audiobook.
        description: Description of the audiobook.
        coverImage: URL or path to the cover image.
        audiofileurl: URL or path to the audiobook audio file.
        audioFile: Object containing audio file details (name, data, contentType).
        uploadedBy: Reference to the user who uploaded the audiobook.

1.2 Course.js

    Description:
    Defines the schema for a course.

    Properties:
        title: Title of the course.
        instructor: Instructor of the course.
        length: Duration of the course.
        description: Description of the course.
        coverImage: URL or path to the cover image.
        contents: Array of audiobooks (references) included in the course.
        createdBy: Reference to the user who created the course.

1.3 User.js

    Description:
    Defines the schema for a user.

    Properties:
        username: Unique username.
        password: User password.
        email: Unique email address.
        fav: Array of favorite audiobooks (references).

2. Controllers
2.1 AudiobookController.js

    Description:
    Contains operations related to audiobooks.

    Operations:
        getAllAudiobooks: Get a list of all audiobooks.
        getAudiobookById: Get details of a specific audiobook by ID.
        createAudiobook: Create a new audiobook.
        updateAudiobook: Update details of an existing audiobook.
        deleteAudiobook: Delete an audiobook.

2.2 CourseController.js

    Description:
    Contains operations related to courses.

    Operations:
        getAllCourses: Get a list of all courses.
        getCourseById: Get details of a specific course by ID.
        createCourse: Create a new course.
        updateCourse: Update details of an existing course.
        deleteCourse: Delete a course.

2.3 UserController.js

    Description:
    Contains operations related to users.

    Operations:
        registerUser: Register a new user.
        loginUser: Log in an existing user.
        addFav: Add an audiobook to user's favorites.
        removeFav: Remove an audiobook from user's favorites.
        userDetails: Get details of the logged-in user.

3. Middleware
3.1 auth.js

    Description:
    Middleware for authenticating user requests using JSON Web Tokens (JWT).

3.2 upload.js

    Description:
    Middleware for handling file uploads using multer.

4. Routes
4.1 userRoutes.js

    Description:
    Defines routes related to user operations.

4.2 courseRoutes.js

    Description:
    Defines routes related to course operations.

4.3 audiobookRoutes.js

    Description:
    Defines routes related to audiobook operations.