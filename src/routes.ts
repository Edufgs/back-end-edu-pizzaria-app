import {Router} from 'express';
import multer from 'multer';

import {CreateUserController} from './controllers/user/CreateUserController';
import {AuthUserController} from './controllers/user/AuthUserController';
import {DetailUserController} from './controllers/user/DetailUserController';
import {CreateCategoryController} from './controllers/category/CreateCategoryController';
import {ListCategoryController} from './controllers/category/ListCategoryController';
import {CreateProductController} from './controllers/product/CreateProductController';

import {isAuthenticated} from './middlewares/isAuthenticated';

//Importa o arquivo de configuraçãoes do multer
import uploadconfig from './config/multer'


//Constante de rotas
const router = Router();

//Constante com o arquivo de configurações criado
//No metodo é preciso passar o nome da pasta "./tmp"
//Vai ser usando como middleware
const upload = multer(uploadconfig.upload("./tmp"));

//Rota Exemplo
//req: Request, res: Response = diz o tipo de cada um
/*router.get('/teste', (req: Request, res: Response) => {
    //Lança um erro se entrar nesta rota
    //throw new Error('Erro ao fazer requisição');

    return res.json({nome: 'Edu Pizza'})
})*/

//---- ROTAS USER ----

//Rota para criar um usuario
//o endereço da rota é /users e cria um controller entrando no metodo handle
//post pois manda dados para api
router.post('/users', new CreateUserController().handle);
//Rota para autenticar um usuario
//post pois manda dados para api
router.post('/sessions', new AuthUserController().handle);
//Rota para detalhar um usuario
//get pois busca dados da api
//isAuthenticated é um middleware que verifica se o usuário está autenticado. Colocando nesse local então sempre vai executar antes de entrar na rota
router.get('/userinfo', isAuthenticated, new DetailUserController().handle);

//---- ROTAS CATEGORY ----
//post pois cadastra algo na api
//isAuthenticated é um middleware que verifica se o usuário está autenticado. Colocando nesse local então sempre vai executar antes de entrar na rota
router.post('/category', isAuthenticated, new CreateCategoryController().handle);
//get pois busca dados da api
//Esta com a mesama rota que em cima mas o tipo da requisição muda
router.get('/category', isAuthenticated,  new ListCategoryController().handle);

//---- ROTAS PRODUCT ----
//post pois cadastra algo na api
//isAuthenticated é um middleware que verifica se o usuário está autenticado. Colocando nesse local então sempre vai executar antes de entrar na rota
//upload é um middleware que faz o upload do arquivo
//a configuração dele é "single" onde envia apenas um arquivo (Tem como mudar essa configuração)
//file é o nome do campo que vai ser envidado a foto (Em vez de ser um request.body, vai ser um request.file)
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle);

//Exporta o router para ser usado em outros arquivos
export{ router };