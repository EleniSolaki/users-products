const express = require('express')
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
const mongoose = require('mongoose');
require('dotenv').config();

const swaggerUi = require('swagger-ui-express');

mongoose.set('strictQuery', false);

const cors = require('cors');
app.use(cors({
    origin:'*' //allow access from everywhere
   // origin:['http://www.section.io', 'https://www.google.com'] allow from specific domains
}))

app.use('/',express.static('files'));

mongoose.connect(
    process.env.MONGODB_URI,
    {useNewUrlParser:true, useUnifiedTopology:true},
    (err)=>{
        if(err){
        console.log(err);
    }else{
        console.log("Connected to MongoDB");
    }
}
)


const user= require("./routes/user.routes");
app.use('/api/user',user);

const userProduct = require("./routes/user.product.routes")
app.use('/api/userproducts',userProduct);

const products = require("./routes/products.routes")
app.use('/api/products',products)


const swaggerDocument = require('./swagger');
app.use('/api-docs',
        swaggerUi.serve,
        swaggerUi.setup(swaggerDocument.options)
        );

app.listen(port,()=>{
    console.log(`Server is listening in port ${port}`)
})

