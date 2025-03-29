import express from 'express'
const router = express.Router();
import upload from '../middleware/multer';

import verifyToken from '../middleware/auth';

router.post('/conversation', verifyToken, upload.none(), )

export default router