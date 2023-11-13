import 'dotenv/config';

export const envs = {
   MONGO_URI: process.env.MONGO_URI,
   PORT: process.env.PORT || 5000,
   Authorization: process.env.Authorization,
   MODO: process.env.MODO,
   JWT_REFRESH: process.env.JWT_REFRESH
};