import Knex from 'knex';

//as funções são contrárias, se uma cria a outra delete
export async function up(knex: Knex){
    //criar a tabela
    return knex.schema.createTable('ponto_item',table => {
        table.increments('id').primary();

        table.integer('ponto_id')
            .notNullable()
            .references('id')
            .inTable('ponto');

        table.integer('item_id')
            .notNullable()
            .references('id')
            .inTable('item');

    });
}

export async function down(knex: Knex){
      //deletar a tabela
      knex.schema.dropTable('ponto_item');
}