const mongoose =require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/user_management_system');
const express = require('express');
const dotenv=require('dotenv');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nocache = require('nocache');
const userRoute = require('./routes/user');
const adminRoute = require('./routes/admin')
const secretString =require('./config/config');

const app = express();

dotenv.config({path:'config.env'});

const PORT = process.env.PORT || 8080;
app.use(session({
    secret: secretString.generateRandomString(32),
    resave:false,
    saveUninitialized:false,

}));
app.use(nocache());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.set('view engine','ejs')

app.use('/css',express.static(path.resolve(__dirname,'assets/css')));
app.use('/img',express.static(path.resolve(__dirname,'assets/img')));
app.use('/js',express.static(path.resolve(__dirname,'assets/js')));

//routes
app.use('/',userRoute);
app.use('/admin',adminRoute);


app.listen(PORT,()=>console.log(`Server is running on http://localhost:${PORT}`));