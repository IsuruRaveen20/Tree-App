const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const logger = require('./utils/logger');
const treeRoutes = require('./routes/tree');
const authRoutes = require('./routes/auth');
const authmiddlewares = require('./middlewares/auth');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000; // set the port number

app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch((error) => {
    logger.error(`Error connecting to MongoDB: ${error.message}`);
  });

app.use('/tree', authmiddlewares, treeRoutes);
app.use('/auth', authRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

app.use((error, req, res, next) => {
  logger.error(`Error: ${error.message}`);
  res.status(500).json({ message: 'Internal server error' });
});

// start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = app;

// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const logger = require('./utils/logger');
// const treeRoutes = require('./routes/tree');
// const authRoutes = require('./routes/auth');
// const authmiddlewares = require('./middlewares/auth');

// dotenv.config();

// const app = express();

// app.use(bodyParser.json());

// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     logger.info('Connected to MongoDB');
//   })
//   .catch((error) => {
//     logger.error(`Error connecting to MongoDB: ${error.message}`);
//   });

// app.use('/tree', authmiddlewares, treeRoutes);
// app.use('/auth', authRoutes);

// app.use((req, res) => {
//   res.status(404).json({ message: 'Not Found' });
// });

// app.use((error, req, res, next) => {
//   logger.error(`Error: ${error.message}`);
//   res.status(500).json({ message: 'Internal server error' });
// });

// module.exports = app;

// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const logger = require('./utils/logger');
// const authRoutes = require('./routes/auth');
// const treeRoutes = require('./routes/tree');
// const authmiddlewares = require('./middlewares/auth');

// dotenv.config();

// const app = express();

// app.use(bodyParser.json());

// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     logger.info('Connected to MongoDB');
//   })
//   .catch((error) => {
//     logger.error(`Error connecting to MongoDB: ${error.message}`);
//   });

// app.use('/auth', authRoutes);
// app.use('/tree', authmiddlewares, treeRoutes);

// app.use((req, res) => {
//   res.status(404).json({ message: 'Not Found' });
// });

// app.use((error, req, res, next) => {
//   logger.error(`Error: ${error.message}`);
//   res.status(500).json({ message: 'Internal server error' });
// });

// module.exports = app;

// // const express = require('express');
// // const bodyParser = require('body-parser');
// // const logger = require('./utils/logger');
// // const treeRoutes = require('./routes/tree');
// // const authRoutes = require('./routes/auth');
// // const mongoose = require('mongoose');
// // require('dotenv').config();

// // const app = express();

// // // middlewares
// // app.use(bodyParser.json());

// // // Routes
// // app.use('/api/trees', treeRoutes);
// // app.use('/api/auth', authRoutes);

// // // MongoDB connection
// // mongoose.connect(process.env.MONGODB_URI, {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true,
// // })
// // .then(() => {
// //   logger.info('Connected to MongoDB');
// //   app.listen(3000, () => {
// //     logger.info('Server started on port 3000');
// //   });
// // })
// // .catch((err) => {
// //   logger.error(`Error connecting to MongoDB: ${err.message}`);
// // });
