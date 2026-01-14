import { Router } from 'express';
import { 
  getAllArticles, 
  getArticleById, 
  createArticle, 
  updateArticle, 
  deleteArticle,
  getPublishedArticles 
} from '../controllers/articleController';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = Router();

// Public routes
router.get('/', getPublishedArticles);
router.get('/:id', getArticleById);

// Admin routes
router.use(authenticateToken);
router.use(requireAdmin);

router.post('/', createArticle);
router.put('/:id', updateArticle);
router.delete('/:id', deleteArticle);

export default router;