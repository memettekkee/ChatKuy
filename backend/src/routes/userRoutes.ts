import express from 'express'
const router = express.Router();
import upload from '../middleware/multer';

import { registerCtrl, loginCtrl, getUserByIdCtrl, updateUserCtrl } from '../controller/userController';
import verifyToken from '../middleware/auth';

router.post('/register', upload.none(), registerCtrl)
router.post('/login', upload.none(), loginCtrl)

// PRIVATE ROUTE
router.get('/profile/detail', verifyToken, getUserByIdCtrl)
router.put('/profile/update', upload.none(), verifyToken, updateUserCtrl)

export default router