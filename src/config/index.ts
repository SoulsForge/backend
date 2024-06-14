import * as dotenv from 'dotenv';

import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().min(1000).default(3000),
  NODE_ENV: z.string().default('development'),
  ORIGIN: z.string().default('*'),
});

const env = envSchema.parse(process.env);

export default env;
