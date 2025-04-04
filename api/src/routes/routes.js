import express from 'express';
const router = express.Router();

router.get('/demo', (req, res) => {
    res.send('Hello from the demo controller!');
});

export default router;
