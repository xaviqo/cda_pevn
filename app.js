import express from "express";
import morgan from "morgan";
import cors from "cors";
import fileUpload from "express-fileupload";
import history from "connect-history-api-fallback";
import path from "path";

const app = express();


// MIDDLEWARES
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true }));
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

// ROUTES
app.use('/', require('./routes/auth.routes'));

// SETTINGS
app.set('port', process.env.PORT || 3000);
app.listen(3000, () => {
    console.log("Server @ port " + app.get('port'));
});