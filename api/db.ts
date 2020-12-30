import { Client, Pool } from 'pg'

const db_login = process.env.POSTGRES_USER;
const db_password = process.env.POSTGRES_PASSWORD;
const db_location = process.env.POSTGRES_URL;

var pool: Pool = new Pool({ connectionString: "postgresql://" + db_login + ":" + db_password + "@" + db_location + "/fymate" });

export default {query: (text : string, params: any) => pool.query(text, params)}