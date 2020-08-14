import joi from '@hapi/joi';

export const guidIdSchema = joi.object<{ id: string }>().keys({
    id: joi.string().guid({ version: 'uuidv4' })
});
