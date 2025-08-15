// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getProfile,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);

//router.get('/profile', protect,authorizeRoles('Admin'), getProfile);
router.get('/', protect, authorizeRoles('admin'), getUsers);
router.get('/:id', protect, getUserById);
router.put('/:id', protect, updateUser);
router.delete('/:id', protect, authorizeRoles('admin'), deleteUser);

router.get('/dashboard', protect, authorizeRoles('Admin', 'User'), (req, res) => {
  res.json({ message: `Welcome ${req.user.role}` });
});

module.exports = router;
