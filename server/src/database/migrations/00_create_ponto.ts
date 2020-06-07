import Knex from 'knex';

//as funções são contrárias, se uma cria a outra delete
export async function up(knex: Knex){
    //criar a tabela
    return knex.schema.createTable('ponto',table => {
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('imagem').notNullable();
        table.string('cidade').notNullable();
        table.string('uf', 2).notNullable();
        table.decimal('latitude').notNullable();
        table.decimal('longitude').notNullable();
    });

}

export async function down(knex: Knex){
    //deletar a tabela
    knex.schema.dropTable('ponto');
}