const Joi = require('joi');

module.exports = [
  {
    method: 'POST',
    path: '/api/v1/product',
    handler: async (request, reply) => {
      const product = await request.db.Product.create(request.payload);
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
  },
  {
    method: 'DELETE',
    path: '/api/v1/product/{id}',
    handler: async (request, reply) => {
      await request.db.Product.find({
        id: request.params.id
      }).remove().exec();
      reply({status: 'success'});
    },
    config: {
      description: 'Delete product',
      tags: ['api'],
      validate: {
        params: {
          id: Joi.number(),
        }
      }
    }
  },
  {
    method: 'PUT',
    path: '/api/v1/product/{id}',
    handler: async (request, reply) => {
      const result = await request.db.Product.update({
        id: request.params.id
      }, {
        $set: request.payload
      });
      reply(result);
    },
    config: {
      description: 'Updates product',
      tags: ['api'],
      validate: {
        params: {
          id: Joi.number(),
        },
        payload: {
          title: Joi.string().required(),
          buyPrice: Joi.number(),
          price: Joi.number(),
          category: Joi.string()
        }
      }
    }
  },
];