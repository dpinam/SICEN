const express = require('express');
const { listRoles } = require('../controllers/roleController');
const { requireAuth } = require('../middlewares/authMiddleware');
const { requireRole } = require('../middlewares/roleMiddleware');

const router = express.Router();

router.get('/', requireAuth, requireRole('Jefatura DAE'), listRoles);

module.exports = router;
