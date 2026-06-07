import express from 'express';
import {connect} from './config/database.js';
import serverConfig from './config/serverConfig.js';
import apiRoutes from './routes/index.js';
import passport from 'passport';
import {passportAuth} from './config/jwt-middleware.js';

const app = express();
const PORT = serverConfig.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(passport.initialize());
passportAuth(passport);

app.use('/api', apiRoutes);


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
