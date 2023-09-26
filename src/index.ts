import { log } from 'console';
import app from './app';
import config from './config';
import mongoose from 'mongoose';

const url = config.DB_URL;


async function connectToDatabase() {
    try {
        await mongoose.connect(url);
        app.listen(config.PORT, () => {
            log('connected with DB...')
            log(`Listening on http://localhost:${config.PORT}`);
        })
    } catch (error) {
        console.error('Error connecting to the database:', error);
        process.exit(1)
    }
}
connectToDatabase();

  
