import express from 'express';
import {connect} from './config/database.js';

const app = express();

const PORT = 3000;

app.listen(PORT, async () => {
    try {
        await connect();
        console.log('mongodb connected');
        console.log(`Server running at PORT ${PORT}`);
    } 
    catch (error) {
        console.log('mongodb connection failed', error);
    }
});
