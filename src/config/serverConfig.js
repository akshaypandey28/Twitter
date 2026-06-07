import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const serverConfig = {
    PORT: process.env.PORT,
    SALT: bcrypt.genSaltSync(10),
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY
};

export default serverConfig;