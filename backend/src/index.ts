import 'dotenv/config';

import { checkJwt } from './middlewares/auth0';
import { database } from './config/database';
import { corsConfig } from './config/cors';

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import userRoutes from './routes/user.routes';
import taskRoutes from './routes/task.routes';

const app = express();

// Configurations Server
app.use(morgan('dev'))
app.use(cors(corsConfig));
app.use(express.json());

// Private Routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', checkJwt, taskRoutes);


const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL as string || '';

async function startServer(): Promise<void> {
    await database.connectToDatabase(DATABASE_URL);

    app.listen(PORT, () => {
        console.log(`✅ - Server is running on port ${PORT}`)
    })
}

startServer();