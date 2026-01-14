const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaignController');
const authMiddleware = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

// Routes accessibles à tous les utilisateurs authentifiés
router.get('/', authMiddleware, campaignController.getAllCampaigns);
router.get('/:id', authMiddleware, campaignController.getCampaignById);

// Routes annonceur et admin
router.post('/', authMiddleware, roleCheck(['advertiser', 'admin']), campaignController.createCampaign);

// Routes ambassadeur uniquement
router.post('/:id/apply', authMiddleware, roleCheck('ambassador'), campaignController.applyToCampaign);

// Routes admin uniquement
router.post('/:id/assign', authMiddleware, roleCheck('admin'), campaignController.assignAmbassador);
router.get('/:id/applications', authMiddleware, roleCheck('admin'), campaignController.getCampaignApplications);

module.exports = router;
