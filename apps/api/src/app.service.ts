import { Injectable } from '@nestjs/common';
import { Client } from 'pg';

@Injectable()
export class AppService {
  private pgClient: Client;

  constructor() {
    this.pgClient = new Client({
      user: process.env.DB_USER || 'admin',
      password: process.env.DB_PASSWORD || 'supersecret',
      host: process.env.DB_HOST || '127.0.0.1',
      database: process.env.DB_NAME || 'challenge_db',
      port: Number(process.env.DB_PORT || 55432),
    });

    this.pgClient.connect()
      .then(() => console.log('Postgres connected successfully'))
      .catch((error) => {
        console.error('Postgres connection error:', error.message);
      });
  }

  async getUsers() {
    const query = `SELECT * FROM users`;
    const res = await this.pgClient.query(query);
    return res.rows;
  }

  async processHeavyTask() {
    let sum = 0;
    for (let i = 0; i < 1e10; i++) {
      sum += i;
    }
    return sum;
  }
}