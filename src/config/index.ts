import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database__url: process.env.DATABASE_URL,
  default_user_pass: process.env.DEFAULT_PASSWORD,
  default_label: process.env.DEFAULT_LABEL,
};
