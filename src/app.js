
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const errorHandler = require( './middleware/500.js');
const notFound = require( './middleware/404.js' );

const apiRouter = require('./api/router.js');
const authRouter = require( './auth/router.js' );

const app = express();

app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));



app.use(apiRouter);
app.use(authRouter);


app.use(notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};
