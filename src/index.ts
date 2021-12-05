import express, { Request, Response, NextFunction } from "express";
import axios from 'axios';
import cors from 'cors';
import md5 from 'md5';
import 'dotenv/config'

const app = express();


const port = process.env.port || 2222;

app.listen(port, () => {
    console.log(`Porta Funcionando ${port}`);
})

app.use(cors());
app.use(express.json());