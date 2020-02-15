
const express = require('express');
const apiRouter = express.Router();

const auth = require('../auth/middleware');


apiRouter.get('/api/v1/models', (request, response) => {
  apiRouter.list()
    .then(models => response.status(200).json(models));
});


apiRouter.get('/api/v1/:model/schema', (request, response) => {
  response.status(200).json(request.model.jsonSchema());
});


apiRouter.get('/api/v1/:model', handleGetAll);


apiRouter.post('/api/v1/:model', auth('create'), handlePost);


apiRouter.get('/api/v1/:model/:id', handleGetOne);


apiRouter.put('/api/v1/:model/:id', auth('update'), handlePut);




apiRouter.delete('/api/v1/:model/:id', auth('delete'), handleDelete);


function handleGetAll(request,response,next) {
  request.model.get()
    .then( data => {
      const output = {
        count: data.length,
        results: data,
      };
      response.status(200).json(output);
    })
    .catch( next );
}

function handleGetOne(request,response,next) {
  request.model.get(request.params.id)
    .then( result => response.status(200).json(result[0]) )
    .catch( next );
}

function handlePost(request,response,next) {
  request.model.create(request.body)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

function handlePut(request,response,next) {
  request.model.update(request.params.id, request.body)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

function handleDelete(request,response,next) {
  request.model.delete(request.params.id)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

module.exports = apiRouter;
