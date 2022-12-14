import * as Joi from 'joi';

export const ConfigSchema: Joi.ObjectSchema = Joi.object().keys({
	DOCS: Joi.boolean().default(true),
	DOC_PATH: Joi.string().default('openapi'),
	GLOBAL_PREFIX: Joi.string().allow(null).default(null),
  NODE_ENV: Joi.string().valid('development', 'test', 'production').default('development'),
	PORT: Joi.number().default(process.env.PORT || 3002),

	CONFIG: Joi.string(),
	IGNORE_CONFIG: Joi.boolean(),

	LOG_REQUESTS: Joi.boolean().default(false),

	HTTP_TIMEOUT: Joi.number().min(0).default(5000),
	
	TIPVOZILAPI_URL: Joi.string().default('http://localhost:3000'),

	/**
	 * TypeORM
	 * @see https://typeorm.io/#/using-ormconfig/using-environment-variables
	 * @see https://typeorm.io/#/connection-options/
	 */
	TYPEORM_CONNECTION: Joi.string().default('mariadb'),
	TYPEORM_HOST: Joi.string().default('localhost'),
	TYPEORM_USERNAME: Joi.string().default('root'),
	TYPEORM_PASSWORD: Joi.string(),
	TYPEORM_DATABASE: Joi.string().default('rso-ms-vozila'),
	TYPEORM_PORT: Joi.number().default(3306),
	TYPEORM_SYNCHRONIZE: Joi.boolean().default(false),
	TYPEORM_LOGGING: Joi.boolean().default(false),

	/**
	 * Consul
	 * @see https://www.npmjs.com/package/nestjs-consul
	 */
	CONSUL_PROTOCOL: Joi.string().valid('http', 'https').default('http'),
	CONSUL_PORT: Joi.number().min(1).default(8500),
	CONSUL_HOST: Joi.string().default('localhost'),
	CONSUL_TOKEN: Joi.string().default(''),
	CONSUL_CRON: Joi.string().default('*/15 * * * *'),

	/**
	 * Kafka
	 * @see https://docs.nestjs.com/microservices/kafka
	 */
	KAFKA_BROKER: Joi.string().default('localhost:9092'),
});
