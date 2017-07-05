const Joi = require('joi');

module.exports = [{
  method: 'POST',
  path: '/api/v1/product',
  handler: async (request, reply) => {
    let a = await request.db.Product.create({title: 'asd'});
    reply(a);
  },
  config: {
    description: 'Creates product',
    tags: ['api'],
    validate: {
      payload: {
        title: Joi.string().required(),
        buyPrice: Joi.number(),
        price: Joi.number(),
        category: Joi.string()
      }
    }
  }
}];
