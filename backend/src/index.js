import pool from './config/db.js';
import app from './routes/urlRoutes.js';



pool.query('SELECT NOW()')
  .then((res) => {
    console.log(res.rows);
  })
  .catch((err) => {
    console.error('Error executing query', err.stack);
  })
  .finally(() => {
    
  });

  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  }
  );

  function shutDown() {
    pool.end(() => {
      console.log('Database connection closed');
      process.exit(0);
    });
  }
  

