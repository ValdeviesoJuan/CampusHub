const express = require('express');
const multer = require('multer');
const path = require('path');
const { Student } = require('./models'); // Adjust the path as needed

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post('/api/students/upload-profile-pic', upload.single('file'), async (req, res) => {
  try {
    const { studentId } = req.body;
    const profileImagePath = `/uploads/${req.file.filename}`;

    // Update student record with profile image path
    await Student.update(
      { profile_image: profileImagePath },
      { where: { id: studentId } }
    );

    res.json({ message: 'Profile picture updated successfully', profileImagePath });
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    res.status(500).json({ message: 'Error uploading profile picture', error });
  }
});

module.exports = router;
