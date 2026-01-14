const express = require('express');
const router = express.Router();
const advertiserController = require('../controllers/advertiserController');
const authMiddleware = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

// Routes annonceur (annonceur uniquement)
router.get('/me/stats', authMiddleware, roleCheck('advertiser'), advertiserController.getMyStats);

// Routes admin (admin uniquement)
router.get('/', authMiddleware, roleCheck('admin'), advertiserController.getAllAdvertisers);

module.exports = router;
