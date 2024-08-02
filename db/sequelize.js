import { Sequelize } from 'sequelize';
const { DB_USER, DB_USER_PASS, DB_HOST, DB_NAME, DB_PORT } = process.env;

const sequelize = new Sequelize({
  dialect: 'postgres',
  username: DB_USER,
  database: DB_NAME,
  password: DB_USER_PASS,
  host: DB_HOST,
  port: DB_PORT,
  dialectOptions: {
    ssl: true,
  },
});

export default sequelize;
