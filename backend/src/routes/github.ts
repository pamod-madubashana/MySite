import { Router } from 'express';
import { getGithubRepos, getRepoDetails } from '../controllers/githubController';

const router = Router();

router.get('/repos', getGithubRepos);
router.get('/repo/:owner/:repo', getRepoDetails);

export default router;