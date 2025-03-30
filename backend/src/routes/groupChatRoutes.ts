import express from 'express';
import verifyToken from '../middleware/auth';
import upload from '../middleware/multer';

const router = express.Router()


router.post('/groups', verifyToken, upload.none(), createGroupConversationCtrl) // Bikin grup baru


export default router