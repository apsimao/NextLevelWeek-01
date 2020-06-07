
import express from 'express';
import { celebrate, Joi } from 'celebrate';

import multer from 'multer'; 
import multerConfig from './config/multer';

import PontoController from './controllers/PontoController';
import ItemController from './controllers/ItemController';

const routes = express.Router();
const upload = multer(multerConfig);

const pontoController = new PontoController();
const itemController = new ItemController();

//por convenção da comunidade, numa Controller 
//para listar é usado o método  o index
//para exibir um item é usado show
// create, update, delete 

routes.get('/item', itemController.index);
routes.get('/ponto/', pontoController.index);
routes.get('/ponto/:id', pontoController.show);

routes.post(
    '/ponto', 
    upload.single('imagem'),
    celebrate({
        body: Joi.object().keys({
            nome: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.number().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            cidade: Joi.string().required(),
            uf: Joi.string().required(),
            item: Joi.string().required(),
        })
    }, {
        abortEarly: false
    }), 
    pontoController.create
);

export default routes;