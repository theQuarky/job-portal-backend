import { Router } from 'express';
import employer from './employerRoute';
import candidate from './candidateRoute';
const router: Router = Router();

router.use('/employer', employer);
router.use('/candidate', candidate);

export default router;