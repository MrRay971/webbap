const express = require('express');
const router = express.Router();
const ambassadorController = require('../controllers/ambassadorController');
const authMiddleware = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

// Routes ambassadeur (ambassadeur uniquement)
router.get('/me/campaigns', authMiddleware, roleCheck('ambassador'), ambassadorController.getMyCampaigns);
router.get('/me/stats', authMiddleware, roleCheck('ambassador'), ambassadorController.getMyStats);

// Routes admin (admin uniquement)
router.get('/', authMiddleware, roleCheck('admin'), ambassadorController.getAllAmbassadors);

module.exports = router;
