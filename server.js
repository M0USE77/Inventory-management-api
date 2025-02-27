const express = require('express');
const colors = require('colors');
const morgan = require ('morgan');
const dotenv = require('dotenv');
const mySqlPool = require('./config/db');

//configure dotenv
dotenv.config();

//rest object
const app = express();

//middlewares
app.use(express.json());
app.use(morgan("dev"));


//routes
app.use('/inventory', require("./routes/InventoryRoutes"));
app.get('/test',(req,res) => {
    res.status(200).send("<h1>Welcome</h1>");
});

//port
const PORT = process.env.PORT || 8000;

//Conditionally Listen
mySqlPool
.query('SELECT 1')
.then(() => {
//MY SQL
console.log('MySQL DB connected'.bgCyan.white);
//listen
app.listen(PORT, () => {
    console.log(`Server Running on port ${process.env.PORT}`.bgMagenta.white);
});
}).catch((error) =>{
    console.log(error);
});