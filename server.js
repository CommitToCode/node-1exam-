const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const dbcon = require('./app/config/dbcon');


require('dotenv').config();
dbcon()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(session({
    secret: 'myverysecurekey123@!',
    resave: false,
    saveUninitialized: true,
}));
app.use(flash());

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


const adminRoutes = require('./app/routes/admin');
const categoryRoutes = require('./app/routes/categoryroutes');
const productRoutes = require('./app/routes/productroutes');
const customerRoutes = require('./app/routes/customer');

// app.use('/', customerRoutes);
app.use('/admin', adminRoutes);
app.use('/admin/categories', categoryRoutes);
app.use('/admin/products', productRoutes);


const PORT = 3080;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
