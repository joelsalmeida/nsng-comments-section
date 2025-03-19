import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });

const mySqlConfig: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['**/*.entity.ts'],
  synchronize: false,
  migrations: ['src/database/migrations/*-migrations.ts'],
};

const MySqlDataSource = new DataSource(mySqlConfig);

export default MySqlDataSource;
