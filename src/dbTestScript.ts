const { Client } = require('pg');


(async () => {
  const client = new Client();

  await client.connect();

  const res = await client.query('SELECT * from film');
  console.log(res);

  await client.end();
})();