import {Request, Response} from 'express';
import knex from '../database/connection';

class PontoController{

    async index(request: Request, response: Response){
        const {cidade, uf, itens } = request.query;

        const parsedItens = String(itens)
            .split(',')
            .map(item => Number(item.trim()));
        
        const pontos = await knex('ponto')
            .join('ponto_item', 'ponto.id', '=', 'ponto_item.ponto_id')
            .whereIn('ponto_item.item_id', parsedItens)
            .where('cidade', String(cidade))
            .where('uf', String(uf))
            .distinct()
            .select('ponto.*');

        const serializedPontos = pontos.map(ponto => {
            return {
                ...ponto,
                imagem_url: `http://192.168.99.1:3333/uploads/${ponto.imagem}`,
            }
        });
        
        return response.json(serializedPontos);
    }


    async show(request: Request, response: Response) {
        const { id } = request.params;

        const ponto = await knex('ponto').where('id', id).first();


        if (!ponto){
            return response.status(400).json({message: 'Ponto não encontrado.'});
        }

        const serializedPonto =  {
                ...ponto,
                imagem_url: `http://192.168.99.1:3333/uploads/${ponto.imagem}`,
        };
        
        const item = await knex('item')
            .join('ponto_item','item.id', '=', 'ponto_item.item_id')
            .where('ponto_item.ponto_id',id)
            .select('item.titulo');

        return response.json({ ponto: serializedPonto, item });
    }

    async create(request: Request, response: Response) {
        const {
            nome,
            email,
            whatsapp,
            cidade,
            uf,
            latitude,
            longitude,
            item
        } = request.body;
    
    
        const trx = await knex.transaction();

        const ponto = {
            imagem: request.file.filename,
            nome,
            email,
            whatsapp,
            cidade,
            uf,
            latitude,
            longitude
        }
    
        const insertedIds = await trx('ponto').insert(ponto);
    
        const ponto_id = insertedIds[0]; 
    
        const pontoItem = item
            .split(',')
            .map((item: string) => Number(item.trim()))
            .map((item_id: number) => {
                return {
                    item_id,
                    ponto_id,
                };
        } )
        await trx('ponto_item').insert(pontoItem);
        
        await trx.commit();
    
        return response.json({
            id: ponto_id,
            ...ponto,
        });
    }
}

export default PontoController;