const express = require('express');
const router = express.Router();
const matchingController = require('../controllers/matchingController');
const authMiddleware = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

// Routes matching (admin uniquement) ⭐
router.get('/campaigns/:id/candidates', authMiddleware, roleCheck('admin'), matchingController.getCandidatesWithScores);
router.post('/campaigns/:id/recalculate', authMiddleware, roleCheck('admin'), matchingController.recalculateScores);

module.exports = router;
