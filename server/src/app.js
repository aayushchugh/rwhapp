/* IMPORT DEPENDENCIES */
import dotenv from 'dotenv'
import express from 'express';
import mongoose from "mongoose";
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.routes.js';

/* INITIALISE APP */
dotenv.config();
const app = express();

/* LOAD MIDDLEWEAR */
app.use(cors({origin: "*", credentials: true}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan(':status :method :url'));

/* MOUNT ROUTES */

app.use('/api/v1/users', userRouter);

/* CONNNECT TO DATABASE */
mongoose.connect(process.env.MONGODB_URI);

/* CONNNECT TO SERVER */
const PORT = process.env.PORT || 1337; 
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});