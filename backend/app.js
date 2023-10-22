require('@babel/register');
const express = require('express');
const serverConfig = require('./config/serverConfig/serverConfig');


const mainRouter = require('./routes/view/main.routes');



const app = express();
const PORT = process.env.PORT ?? 3000;

serverConfig(app);


app.use('/', mainRouter);



app.listen(PORT, () => {
    console.log(`Go on port ${PORT}`)
})