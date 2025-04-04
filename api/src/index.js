import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/routes.js';
import dotenv from 'dotenv';
import db from './db.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/', router);

const startServer = async () => {
    try {
        await db.ConnectToDatabase();
        console.log('Connected to database successfully!');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}

startServer();



