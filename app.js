const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const history = require('connect-history-api-fallback');
const path = require('path');

const app = express();

// MIDDLEWARES
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true }));

// ROUTES
app.use('/', require('./routes/auth.routes'));
app.use('/actor', require('./routes/actor.routes'));

// MIDDLEWARES FOR VUE
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

// SETTINGS
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
    console.log("Server @ port " + app.get('port'));
});

// module.exports = app;