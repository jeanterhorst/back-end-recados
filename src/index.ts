import express, { Request, Response, NextFunction } from "express";
import axios from 'axios';
import cors from 'cors';
import 'dotenv/config'

const app = express();


const port = process.env.port || 2222;

app.listen(port, () => {
    console.log(`Porta Funcionando ${port}`);
})

app.use(cors());
app.use(express.json());

app.listen(3000, () => {
    console.log("servidor inicializado");

})

class Usuario {
    public nome: string;
    public senha: string;
    public id: number;
    public recado: Recado[];
    public numRecado: number;


    constructor(nome: string, senha: string, id: number) {
       this.nome = nome;
       this.senha = senha;
       this.recado = [];
       this.id = id;
       this.numRecado = 1;
    }
 }
 
 class Recado {
    public numeroRecado: number;
    public descricao: string;
    public detalhes: string;

    constructor(numeroRecado: number, descricao: string, detalhes: string) {
       this.numeroRecado = numeroRecado;
       this.descricao = descricao;
       this.detalhes = detalhes;
    }
 }
 

let usuarios : Usuario[] = [];
let id: number = 0;

let verificaUsuario = (req: Request, res: Response, next: NextFunction) => {
    for (let usuario of usuarios) {
       if (usuario.nome == req.body.nome) {
          res.status(400).send(`Este usuario já existe`);
       }
    }
    next();
 };


app.post('/criaConta', verificaUsuario, (req: Request, res: Response) => {
    let { nome, senha } = req.body;

    id++; 

    let novoUsuario: Usuario = new Usuario (nome, senha, id);
    usuarios.push(novoUsuario)
    return res.status(200).send(`Conta Criada`);
 });

 app.post('/login', (req: Request, res: Response) => {
    let { nome, senha } = req.body;
    let verfDados = usuarios.findIndex((usuario) => usuario.senha == senha && usuario.nome == nome);
    if (verfDados < 0) {
       return res.status(404).send(`usuario/senha nao conferem`);
    } else {
       return res.status(200).send(`Usuario entrou na pagina de recados`);
    }
 });
 
 app.get('/login/:id', (req: Request, res: Response) => {
    const idBuscado: number = Number (req.params.id);
    let usuarioRetornado: Usuario | undefined = usuarios.find( (usuario) => usuario.id == idBuscado)
 
    res.status(200).send(usuarioRetornado)
 });
 
 app.post('/novoRecado/:id', (req: Request, res: Response) => {
    let id: number = Number(req.params.id);
    let { detalhes, descricao } = req.body;
    let indUsuario = usuarios.findIndex((usuario) => usuario.id == id);
    let novoRecado: Recado = new Recado(usuarios[indUsuario].numRecado, descricao, detalhes);
    usuarios[indUsuario].recado.push(novoRecado);
    usuarios[indUsuario].numRecado++;
    res.status(200).send('recado salvo');
 });
 
 app.put('/editaRecado/:id/:numeroNota', (req: Request, res: Response) => {
    let { id, numeroRecado } = req.params;
    let { detalhes, descricao } = req.body;
    let indUsuario = usuarios.findIndex((usuario) => usuario.id == Number (id));
    let indRecado = usuarios[indUsuario].recado.findIndex((recado) => recado.numeroRecado == Number(numeroRecado));
    usuarios[indUsuario].recado[indRecado].detalhes = detalhes;
    usuarios[indUsuario].recado[indRecado].descricao = descricao;
    res.status(200).send('Recado editado');
 });
 
 app.delete('/apagaRecado/:id/:numeroRecado', (req: Request, res: Response) => {
    let { id, numeroRecado } = req.params;
    let indUsuario = usuarios.findIndex((usuario) => usuario.id == Number (id));
    let indRecado = usuarios[indUsuario].recado.findIndex((recado) => recado.numeroRecado == Number(numeroRecado));
    usuarios[indUsuario].recado.splice(indRecado, 1);
    res.status(200).send('Recado apagado');
 });
 