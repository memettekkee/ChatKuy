import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import userRoute from './routes/userRoutes'
import chatRoute from './routes/chatRoutes'

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors({ credentials: true }));

app.use('/api', userRoute)
app.use('/api', chatRoute)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})