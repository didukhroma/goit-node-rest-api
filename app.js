import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import 'dotenv/config';

import sequelize from './db/sequelize.js';
import HttpCode from './helpers/HttpCode.js';
import authRouter from './routes/authRoutes.js';
import contactsRouter from './routes/contactsRouter.js';

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/auth', authRouter);
app.use('/api/contacts', contactsRouter);

app.use((_, res) => {
  res.status(HttpCode[404].code).json({
    message: 'Route not found',
  });
});

app.use((err, req, res, next) => {
  const { status = HttpCode[500].code, message = 'Server error' } = err;
  res.status(status).json({ message });
});

let server = null;

try {
  await sequelize.authenticate();
  console.log('Database connection successful');
  server = app.listen(process.env.PORT || 3000, () => {
    console.log(
      `Server is running. Use our API on port: ${process.env.PORT || 3000}`,
    );
  });
} catch (e) {
  console.log(e);
  process.exit(1);
}

export default server;
