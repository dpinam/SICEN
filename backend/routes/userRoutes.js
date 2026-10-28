const express = require('express');
const { getProfile, listUsers, createUser } = require('../controllers/userController');
const { requireAuth } = require('../middlewares/authMiddleware');
const { requireRole } = require('../middlewares/roleMiddleware');

const router = express.Router();

router.get('/me', requireAuth, getProfile);
router.get('/', requireAuth, requireRole('Jefatura DAE'), listUsers);
router.post('/', requireAuth, requireRole('Jefatura DAE'), createUser);

module.exports = router;
