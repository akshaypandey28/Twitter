import express from 'express';
import {connect} from './config/database.js';
import serverConfig from './config/serverConfig.js';

const app = express();

const PORT = serverConfig.PORT;

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
