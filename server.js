import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import path from 'path';

// data and config
import data from './data';
import config from './config';

// routes
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';
import orderRouter from './routes/orderRoute';

// imports through variable assignment
var mongoose = require('mongoose');

dotenv.config()

const mongodbURL = config.MONGODB_URL;

mongoose.connect(mongodbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch(error => console.log(error.reason));


const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());

app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRouter);

// app.get("/api/products/:id", (req, res) => {
//     const productId = req.params.id;
//     const product = data.products.find(x=>x._id === productId);
//     if(product)
//         res.send(product);
//     else
//         res.status(404).send({msg: "Product Not Found"});
// });

// app.get("/api/products", (req, res) => {
//     res.send(data.products);
// });
if (process.env.NODE_ENV === 'production'){
    app.use(express.static('./frontend/build'))
}

app.listen(PORT, () => {console.log(`server started at ${PORT}`)})

