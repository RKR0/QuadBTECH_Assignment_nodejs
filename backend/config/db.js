import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '123qaz',
    port: 5432,
  });

 
  export default pool;