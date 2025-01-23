import 'dotenv/config';

export const env = {
  API_PORT: String(process.env.API_PORT),
  DATABASE: {
    host: process.env.DB_HOST ?? '',
    name: process.env.DB_NAME ?? '',
    password: process.env.DB_PASSWORD ?? '',
    port: process.env.DB_PORT ?? '',
    ssl: process.env.DB_SSL === 'true',
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
    userName: process.env.DB_USERNAME ?? ''
  },
  HASH_SALT: Number(process.env.HASH_SALT),
  JWT: {
    EXPIRES_IN: String(process.env.JWT_EXPIRES_IN),
    SECRET: String(process.env.JWT_SECRET)
  },
  NODEMAILER: {
    enabled: process.env.NODEMAILER_ENABLED === 'true',
    from: process.env.NODEMAILER_EMAIL_FROM ?? '',
    host: process.env.NODEMAILER_HOST ?? '',
    password: process.env.NODEMAILER_PASSWORD ?? '',
    service: process.env.NODEMAILER_SERVICE ?? '',
    username: process.env.NODEMAILER_USERNAME ?? ''
  },
  URLConfig: {
    frontURL: process.env.FRONT_URL ?? ''
  }
};
