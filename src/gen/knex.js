var knex = require('knex')({
    client: 'mysql',
    connection: {
      host : 'cast.saesolsoft.com',
      user : 'saesol',
      password : 'saesol',
      database : 'foodatarak'
    }
  });

  var a = knex.select('invNo', 'Note').from('sales');
  console.log(a)
