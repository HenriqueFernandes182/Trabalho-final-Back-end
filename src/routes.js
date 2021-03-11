import { Router } from 'express';
import cors from 'cors';

import UserController from './app/controllers/UserController';
import AuthController from './app/controllers/AuthController';

import authMiddleware from './app/middlewares/auth';
import MarcaController from './app/controllers/MarcaController';
import ProdutoController from './app/controllers/ProdutoController';

const routes = Router();
routes.use(cors());

routes.get('/', (req, res) => res.json({ result: 'TEST-API' }));

//  ROTAS PARA MARCAS
routes.post('/marcas', MarcaController.store);
routes.get('/marcas', MarcaController.index);
routes.get('/marcas/:uid', MarcaController.show);

// ROTAS PARA PRODUTOS
routes.get('/produtos', ProdutoController.index);
routes.get('/produtos/:uid', ProdutoController.show);

// Rotas para USERS
routes.post('/users', UserController.store);
routes.get('/users', UserController.index);

routes.post('/login', AuthController.store);

// ROTAS PARA PRODUTOS COM AUTH
routes.post('/produtos', ProdutoController.store);
routes.put('/produtos/:uid', ProdutoController.update);
routes.delete('/produtos/:uid', ProdutoController.delete);
// Rotas autenticadas
routes.use(authMiddleware);

// rotas para usuario auth
routes.put('/users/:uid', UserController.update);

export default routes;
