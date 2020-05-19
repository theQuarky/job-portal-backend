import { Router } from 'express';
import employer from './employerRoute';
import candidate from './candidateRoute';
import jobs from './jobsRoute';
const router: Router = Router();

router.get('/', (req,res)=>{
    res.send({
        msg : 'working!'
    });
})

router.use('/employer', employer);
router.use('/candidate', candidate);
router.use('/jobs', jobs);

export default router;