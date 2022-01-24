import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: process.env.PORT,
  salts: process.env.HASH_SALTS,
}));
