/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  PRODUCTS_MICROSERVICE_HOST: string;
  PRODUCTS_MICROSERVICE_PORT: number;
  ORDER_MICROSERVICE_HOST: string;
  ORDER_MICROSERVICE_PORT: number;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const envsSchema = joi
  .object<EnvVars>({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    PORT: joi.number().required(),
    PRODUCTS_MICROSERVICE_HOST: joi.string().required(),
    PRODUCTS_MICROSERVICE_PORT: joi.number().required(),
    ORDER_MICROSERVICE_HOST: joi.string().required(),
    ORDER_MICROSERVICE_PORT: joi.number().required(),
  })
  .unknown(true); // Allow additional properties

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const envsVars: EnvVars = value;

export const envs = {
  PORT: envsVars.PORT,
  PRODUCTS_MICROSERVICE_HOST: envsVars.PRODUCTS_MICROSERVICE_HOST,
  PRODUCTS_MICROSERVICE_PORT: envsVars.PRODUCTS_MICROSERVICE_PORT,
  ORDER_MICROSERVICE_HOST: envsVars.ORDER_MICROSERVICE_HOST,
  ORDER_MICROSERVICE_PORT: envsVars.ORDER_MICROSERVICE_PORT,
};
