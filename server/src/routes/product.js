const Joi = require('joi');

module.exports = [
  {
    method: 'POST',
    path: '/api/v1/product',
    handler: async (request, reply) => {
      const product = await request.db.Product.create({
        title: request.payload.title
      });
      reply(product);
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
  },
  {
    method: 'GET',
    path: '/api/v1/products',
    handler: async (request, reply) => {
      const products = await request.db.Product.paginate({}, {
        page: request.query.page || 1,
        limit: 5
      });
      reply(products);
    },
    config: {
      description: 'Get products',
      tags: ['api'],
      validate: {
        query: {
          page: Joi.number(),
        }
      }
    }
  }
];