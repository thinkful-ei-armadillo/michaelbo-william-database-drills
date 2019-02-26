require('dotenv').config()
const knex = require('knex')

const knexInstance = knex({
client: 'pg',
connection: process.env.DB_URL,
})

console.log('connection successful');


function searchbyName(searchTerm){
   knexInstance
     .select('*')
     .from('shopping_list')
     .where('product_name', 'ILIKE', `%${searchTerm}%`)
     .then(result => {
         console.log(result);
     })

}

searchbyName('kale');

function searchbyPage(pageNumber){
  const productsPerPage = 6;
  knexInstance
    .select('*')
    .from('shopping_list')
    .limit(productsPerPage)
    .then(result =>{
      console.log(result);
    })

}

searchbyPage(3);

function searchItemsAfterDate(daysAgo){
   knexInstance
     .select('*')
     .from('shopping_list')
     .where('date_added',
      '>',  
      knexInstance.raw(`now() - '${daysAgo} days'::INTERVAL`)
      )
      .then(result =>{
        console.log(result);
      })
}

searchItemsAfterDate(4);

function findTotalCost(){
    knexInstance
      .select( 'category')
      .sum('price')
      .from('shopping_list')
      .groupBy('category')
      .then(result =>{
        console.log('Total prices')
        console.log(result)
      })

}

findTotalCost();