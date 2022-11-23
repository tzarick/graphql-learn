(async () => {
  const { Client } = require('pg');

  const client = new Client();

  await client.connect();

  const res = await client.query('SELECT * from linkdata');
  console.log(res.rows);

  await client.end();
})();