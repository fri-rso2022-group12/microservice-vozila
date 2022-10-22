import * as Joi from 'joi';

export const ConfigSchema: Joi.ObjectSchema = Joi.object().keys({
  NODE_ENV: Joi.string().valid('development', 'test', 'production').default('development'),
	PORT: Joi.number().default(process.env.PORT || 3001),

	CONFIG: Joi.string(),
	IGNORE_CONFIG: Joi.boolean(),
});
