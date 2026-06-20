import express, { json } from 'express';

(async () => {
  try {
    const dotenv = await import('dotenv');
    dotenv.config();
  } catch (err) {
    console.warn('`dotenv` not installed — continuing without loading .env');
  }

  const app = express();
  const port = process.env.PORT || 3000;

  // Using  express.json() to parse JSON request bodies
  app.use(express.json());
  app.use((req, res, next) => {
    // logging every request
    console.log(`${req.method} ${req.url} - ${new Date()}`);
    next();
  });

  app.get('/', (req, res) => {
    res.send('My Week 2 API!');
  });

  app.get('/user', (req, res) => {
    // Informative response for root /user GET requests
    return res.json({ message: 'This endpoint accepts POST to create a user. Use GET /user/:id to fetch a user.' });
  });

 app.post('/user', (req, res) => {

    const body = req.body || {};
    const { name, email } = body;

    if (!name || !email) {
      console.log('Missing name or email in request body');
      return res.status(400).json({ error: 'name and email are required' });
    }

    console.log(`Creating user: ${name}, ${email}`);
    return res.json({ message: `Hello, ${name}` });
  });



  app.get('/user/:id', (req, res) => {
    const id = req.params.id;
    console.log(`Fetching user with ID: ${id}`);
    res.send(id);
  });

 
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
})();