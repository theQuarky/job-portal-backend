import { Router } from 'express';
import employer from './employerRoute';
import candidate from './candidateRoute';
import jobs from './jobsRoute';
import resume from './resumeRoute';
import blog from './blogRoute';
import vlog from './vlogRoute';
import admin from './adminRoute';

const router: Router = Router();

router.get('/', (req,res)=>{
    res.send({
        msg : 'working!'
    });
})

router.use('/employer', employer);
router.use('/candidate', candidate);
router.use('/jobs', jobs);
router.use('/resume',resume);
router.use('/blog', blog);
router.use('/vlog', vlog);
router.use('/admin', admin);
export default router;