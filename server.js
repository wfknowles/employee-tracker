const express = require('express');
const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');

// server
const PORT = process.env.PORT || 3001;
const app = express();

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes
app.use('/api', apiRoutes);

// default 404
app.use((req, res) => {
  res.status(404).end();
});

// start database
db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

