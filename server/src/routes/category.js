const Joi = require('joi');

module.exports = [
  {
    method: 'POST',
    path: '/api/v1/category',
    handler: async (request, reply) => {
      reply(await request.db.Category.create({
        title: request.payload.title
      }));
    },
    config: {
      description: 'Creates category',
      tags: ['api'],
      validate: {
        payload: {
          title: Joi.string().required()
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/api/v1/category',
    handler: async (request, reply) => {
      reply(request.db.Category.find().exec());
    },
    config: {
      description: 'Get categories',
      tags: ['api']
    }
  },
  {
    method: 'DELETE',
    path: '/api/v1/category/{id}',
    handler: async (request, reply) => {
      await request.db.Category.find({
        _id: request.params.id
      }).remove().exec();
      reply({status: 'success'});
    },
    config: {
      description: 'Delete category',
      tags: ['api'],
      validate: {
        params: {
          id: Joi.string(),
        }
      }
    }
  },
  {
    method: 'PUT',
    path: '/api/v1/category/{id}',
    handler: async (request, reply) => {
      const result = await request.db.Category.update({
        _id: request.params.id
      }, {
        $set: request.payload
      });
      reply(result);
    },
    config: {
      description: 'Update category',
      tags: ['api'],
      validate: {
        params: {
          id: Joi.string(),
        },
        payload: {
          title: Joi.string().required()
        }
      }
    }
  },
];