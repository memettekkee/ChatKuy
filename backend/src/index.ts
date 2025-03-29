import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import userRoute from './routes/userRoutes'

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors({ credentials: true }));

app.use('/', userRoute)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})