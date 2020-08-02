var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


global.refuels = [
    {
        _id: "12343445345",
        pumpId: 1,
        consume: 2.5,
        price: 2000,
        unit: 800,
        finish: false,
        traking: null
    },
    {
        _id: "1234344534fb5",
        pumpId: 2,
        consume: 2.5,
        price: 2000,
        unit: 800,
        finish: false,
        traking: null
    },
    {
        _id: "1234bfdg3445345",
        pumpId: 3,
        consume: 2.5,
        price: 2000,
        unit: 800,
        finish: false,
        traking: null
    },
    {
        _id: "123434lkgf45345",
        pumpId: 4,
        consume: 2.5,
        price: 2000,
        unit: 800,
        finish: false,
        traking: null
    },
    {
        _id: "1sad234344fdg5345",
        pumpId: 5,
        consume: 2.5,
        price: 2000,
        unit: 800,
        finish: false,
        traking: null
    },
    {
        _id: "12343445345kjlasd",
        pumpId: 6,
        consume: 2.5,
        price: 2000,
        unit: 800,
        finish: false,
        traking: null
    },
    {
        _id: "123434jhkasdzx45345",
        pumpId: 7,
        consume: 2.5,
        price: 2000,
        unit: 800,
        finish: false,
        traking: null
    },
    {
        _id: "1234344lk5345",
        pumpId: 8,
        consume: 2.5,
        price: 2000,
        unit: 800,
        finish: false,
        traking: null
    },
    {
        _id: "123434asdas3545345",
        pumpId: 9,
        consume: 2.5,
        price: 2000,
        unit: 800,
        finish: false,
        traking: null
    },
    {
        _id: "123433445345klasdf",
        pumpId: 10,
        consume: 2.5,
        price: 2000,
        unit: 800,
        finish: false,
        traking: null
    },
    {
        _id: "12sad34344nb5345",
        pumpId: 11,
        consume: 2.5,
        price: 2000,
        unit: 800,
        finish: false,
        traking: null
    },
    {
        _id: "1234asd344534yui5",
        pumpId: 12,
        consume: 2.5,
        price: 2000,
        unit: 800,
        finish: false,
        traking: null
    },
    {
        _id: "12sdf34ghj344dfsa5345",
        pumpId: 13,
        consume: 2.5,
        price: 2000,
        unit: 800,
        finish: false,
        traking: null
    },
    {
        _id: "123xcv434bnvn4534yu5",
        pumpId: 14,
        consume: 2.5,
        price: 2000,
        unit: 800,
        finish: false,
        traking: null
    },
    {
        _id: "1234fdg4344mzx5345",
        pumpId: 15,
        consume: 2.5,
        price: 2000,
        unit: 800,
        finish: false,
        traking: null
    },
    {
        _id: "12354343ads4453ljk45",
        pumpId: 16,
        consume: 2.5,
        price: 2000,
        unit: 800,
        finish: false,
        traking: null
    },
    {
        _id: "1zcx23dfg4344jhg5345",
        pumpId: 17,
        consume: 2.5,
        price: 2000,
        unit: 800,
        finish: false,
        traking: null
    },
    {
        _id: "123434zzffds4534kkk5",
        pumpId: 18,
        consume: 2.5,
        price: 2000,
        unit: 800,
        finish: false,
        traking: null
    },
    {
        _id: "1234zzzz3ccccc445345",
        pumpId: 19,
        consume: 2.5,
        price: 2000,
        unit: 800,
        finish: false,
        traking: null
    },
    {
        _id: "12vvvvv3sdf434nnnn45345",
        pumpId: 20,
        consume: 2.5,
        price: 2000,
        unit: 800,
        finish: false,
        traking: null
    },
];

var indexRouter = require('./routes/index');
var posRouter = require('./routes/pos');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/pos', posRouter);

module.exports = app;
