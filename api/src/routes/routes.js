import express from 'express';
import demoController from '../controllers/demo.js';
const router = express.Router();

router.get('/demo',demoController.FindAllDemo)
router.get('/demo/:id',demoController.FindOneDemo)
router.post('/demo',demoController.CreateDemo)


export default router;
