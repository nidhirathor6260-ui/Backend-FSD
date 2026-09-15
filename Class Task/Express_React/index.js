import express from 'express';
import cors from 'cors';
import fs from 'fs';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/products', (req, res)=>{
    const data = fs.readFile("product.json")
})
app.listen(4000, ()=>{

})