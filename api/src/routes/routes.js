import express from 'express';
import demoController from '../controllers/demo.js';
const router = express.Router();

router.get('/demo',demoController.FindAllDemo)
router.post('/demo',demoController.CreateDemo)


export default router;
