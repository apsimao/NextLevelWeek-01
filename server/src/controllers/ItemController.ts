import {Request, Response} from 'express';
import knex from '../database/connection';

class ItemController{
    async index (request: Request, response: Response) {
        const itens = await knex('item').select('*'); 
    
        const serializedItem = itens.map(item => {
            return {
                id: item.id,
                titulo: item.titulo,
                imagem_url: `http://192.168.99.1:3333/uploads/${item.imagem}`,
            }
        }) 
    
        return response.json(serializedItem);  
    }

}

export default ItemController;