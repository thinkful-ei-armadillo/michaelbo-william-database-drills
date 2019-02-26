/* eslint-disable strict */

/* global expect */

const ShoppingListService = require('../src/shopping-list-service');
const knex = require('knex');

describe('Shopping list object', function() {
  let db;

  let testItems = [
    {
      id: 1,
      name: 'Fish',
      price: '1.00',
      date_added: '2019-02-05 13:07:47',
      checked: true,
      category: 'Main'
    },
    {
      id: 2,
      name: 'Meat',
      price: '1.10',
      date_added: '2019-02-05 13:07:47',
      checked: false,
      category: 'Main'
    }
  ];

  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL
    });
  });

  before(() => db('shopping_list').truncate());

  context('Given shopping list has data', () => {
    before(() => {
      return db
        .into('shopping_list')
        .insert(testItems);
    });
  });

  after(() => db.destroy());

  it('resolves all items from shopping list', () => {
    return ShoppingListService.getAllItems()
      .then(actual => {
        expect(actual).to.eql(testItems);

      });
  });
});
