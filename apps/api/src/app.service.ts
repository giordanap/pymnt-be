import { Injectable } from '@nestjs/common';
import { Client } from 'pg';

@Injectable()
export class AppService {
  private pgClient: Client;

  constructor() {
    this.pgClient = new Client({
      user: 'admin',
      password: 'supersecretpassword',
      host: 'postgres',
      database: 'challenge_db',
      port: 5432,
    });
    this.pgClient.connect();
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
