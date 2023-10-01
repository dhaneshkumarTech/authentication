const express = require('express');
const router = require('./router');
const connect = require('./config/database')
const dotenv = require('dotenv')


const PORT = process.env.PORT || 3000;


dotenv.config();
connect.connect();


const app = express();
app.use(express.json());
app.use(router);


app.listen(PORT, async () => {
    console.log(`Server is listening at port ${PORT}`);
});