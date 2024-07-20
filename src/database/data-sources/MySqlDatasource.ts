import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Comment } from '../../models/comment/comment.entity';
import { Response } from '../../models/response/response.entity';
import { User } from '../../models/user/user.entity';

dotenvConfig({ path: '.env' });

const mySqlConfig = {
  type: 'mysql',
  host: `${process.env.DB_HOST}`,
  port: `${parseInt(process.env.DB_PORT)}`,
  username: `${process.env.DB_USERNAME}`,
  password: `${process.env.DB_PASSWORD}`,
  database: `${process.env.DB_NAME}`,
  entities: [User, Comment, Response],
  synchronize: true,
};

const MySqlDataSource = new DataSource(mySqlConfig as DataSourceOptions);

export default registerAs('typeorm', () => mySqlConfig);

export { MySqlDataSource };
