const express = require('express');
const morgan = require("morgan");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders')

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//mongodb connection
let connect = async() => {
    return mongoose.connect(
    "mongodb+srv://admin:" +process.env.MONGO_ATLAS_PW+ "@cluster0-o0eeu.mongodb.net/test?retryWrites=true&w=majority", {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
};

connect().then(msg => {
    console.log('success'+msg);
}).catch(err => {
    console.log(err);
    
})

//prevent from cross-orign-resource-sharing(Cors)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow_Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-methods', 'GET, PUT, POST, PATCH, DELETE');
        res.status(200).json({});
    }
    next();
})

//Routes
app.use('/products', productRoutes);
app.use('/orders',orderRoutes);

app.use((req, res, next) => {
    const error = new Error("Route not found");
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status).json({
        error: {
            message: error.message
        }
    });
})

module.exports = app;