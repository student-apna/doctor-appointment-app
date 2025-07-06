import express from 'express';
import cors from 'cors';
import 'dotenv/config';


// app config

const app = express();
const PORT = process.env.PORT || 4000;

// middlewares
app.use(express.json());
app.use(cors());

// api endpoints

app.get('/',(req,res)=>{
    res.send('API is Working Fine aftab');
})

app.listen(PORT,()=>{
    console.log(`Server is Running at port ${PORT}`);
})