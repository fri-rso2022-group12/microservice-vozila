import * as Joi from 'joi';

export const ConfigSchema: Joi.ObjectSchema = Joi.object().keys({
	DOCS: Joi.boolean().default(true),
	DOC_PATH: Joi.string().default('openapi'),
  NODE_ENV: Joi.string().valid('development', 'test', 'production').default('development'),
	PORT: Joi.number().default(process.env.PORT || 3001),

	CONFIG: Joi.string(),
	IGNORE_CONFIG: Joi.boolean(),
});
