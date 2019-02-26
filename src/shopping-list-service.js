/* eslint-disable strict */
require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
});

// methods for CRUD (get, insert, update, and delete)

const ShoppingListService = {

  getAllItems(knexInstance) {
    return knexInstance
      .select('*')
      .from('shopping_list');
  },
  insertItem(knex, newItem) {
    return knex
      .insert(newItem)
      .into('shopping_list')
      .return('*')
      .then(rows => {
        return rows[0];
      });
  },
  getItemById(knex, id) {
    return knex
      .select('*')
      .from('shopping_list')
      .where('product_id', id)
      .first();
  },
  updateItem(knex, id, newItem) {
    return knex
      .from('shopping_list')
      .where({ id })
      .update(newItem);
  },
  deleteItem(knex, id) {
    return knex
      .from('shopping_list')
      .where({ id })
      .delete();
  }
};

module.exports = ShoppingListService;