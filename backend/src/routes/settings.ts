import { Router } from 'express';
import { getSettings, updateSettings } from '../controllers/settingsController';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = Router();

// Public route
router.get('/', getSettings);

// Admin routes
router.use(authenticateToken);
router.use(requireAdmin);

router.put('/', updateSettings);

export default router;