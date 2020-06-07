import Knex from 'knex';

//as funções são contrárias, se uma cria a outra delete
export async function up(knex: Knex){
    //criar a tabela
    return knex.schema.createTable('item',table => {
        table.increments('id').primary();
        table.string('titulo').notNullable();
        table.string('imagem').notNullable();
    });
}

export async function down(knex: Knex){
      //deletar a tabela
      knex.schema.dropTable('item');
}