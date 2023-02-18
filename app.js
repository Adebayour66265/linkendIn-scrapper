const path = require('path');

const express = require('express');
const app = express();
const homeRoute = require('./routes/homeRoutes');
const getRoutes = require('./routes/getRoutes');

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));


app.use('/', homeRoute);
app.use('/api', getRoutes);

app.use(express.urlencoded({ extended: true }));

// VIEW ENGINE
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));

const PORT = 3000;
app.listen(PORT, () => {
    console.log('App is Listing to PORT');
})