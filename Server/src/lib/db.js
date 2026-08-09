import {Pool} from 'pg';
import {env} from '../config/env.js';

// This will create a connection pool and the pool will be used to interact with the DB.
export const pool = new Pool ({
    connectionString: env.databaseUrl
});