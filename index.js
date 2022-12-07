const express=require('express')
const mongoose=require("mongoose")
const app=express();
const port=process.env.PORT || 6000
require('dotenv').config();
const userRoutes= require('./routes/users')
const envRoutes=require('./routes/envios')

//middleware
app.use(express.json());
app.use('/user',userRoutes);
app.use('/env',envRoutes);

//rutas

app.get('/', (req,res)=>{
    res.send('welcome to my api')
});

//conection mongoDB
const mongo ='mongodb+srv://react-mt2022:123@mintic.w5a100r.mongodb.net/?retryWrites=true&w=majority' 
mongoose
.connect(mongo)
.then(()=> console.log('✨DB Conectada MongoAtlas✨'))
.catch((error)=>console.error(error))

app.listen(port,()=>console.log('✨Server online', port,'✨'));