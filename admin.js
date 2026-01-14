const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

// Routes admin uniquement
router.get('/stats', authMiddleware, roleCheck('admin'), adminController.getGlobalStats);
router.patch('/users/:id/validate', authMiddleware, roleCheck('admin'), adminController.validateUser);

module.exports = router;
