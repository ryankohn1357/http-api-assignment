// write a generic response to a request
const respond = (request, response, status, content, type) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(content);
  response.end();
};

// call for a successful response
const success = (request, response, acceptedType) => {
  const content = {
    message: 'This is a successful response',
  };
  
  // return response in requested format
  if (acceptedType === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${content.message}</message></response>`;
    return respond(request, response, 200, responseXML, 'text/xml');
  }

  const responseJSON = JSON.stringify(content);
  return respond(request, response, 200, responseJSON, 'application/json');
};

// returns success or failure based on 'valid' query parameter
const badRequest = (request, response, params, acceptedType) => {
  const content = {
    message: 'This request has the required parameters',
  };

  // make sure valid exists as a parameter and check its value - if it's not true, the response will be a failure
  if (!params.valid || params.valid !== 'true') {
    content.message = 'Missing valid query parameter set to true';
    content.id = 'badRequest';
  }

  if (acceptedType === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${content.message}</message>`;
    if (content.id) {
      responseXML = `${responseXML} <id>${content.id}</id> </response>`;
      return respond(request, response, 400, responseXML, 'text/xml');
    }
    responseXML = `${responseXML} </response>`;
    return respond(request, response, 200, responseXML, 'text/xml');
  }

  const responseJSON = JSON.stringify(content);
  if (content.id) {
    return respond(request, response, 400, responseJSON, 'application/json');
  }
  return respond(request, response, 200, responseJSON, 'application/json');
};

// returns a not found response
const notFound = (request, response, acceptedType) => {
  const content = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  if (acceptedType === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${content.message}</message>`;
    responseXML = `${responseXML} <id>${content.id}</id> </response>`;
    return respond(request, response, 404, responseXML, 'text/xml');
  }

  const responseJSON = JSON.stringify(content);
  return respond(request, response, 404, responseJSON, 'application/json');
};

// returns success or unauthorization failure based on loggedIn query parameter
const unauthorized = (request, response, params, acceptedType) => {
  const content = {
    message: 'You have successfully viewd the content.',
  };

  // make sure loggedIn exists as a parameter and check its value - if it's not yes, the response will be a failure
  if (!params.loggedIn || params.loggedIn !== 'yes') { 
    content.message = 'Missing loggedIn query parameter set to yes';
    content.id = 'unauthorized';
  }

  if (acceptedType === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${content.message}</message>`;
    if (content.id) {
      responseXML = `${responseXML} <id>${content.id}</id> </response>`;
      return respond(request, response, 401, responseXML, 'text/xml');
    }
    responseXML = `${responseXML} </response>`;
    return respond(request, response, 200, responseXML, 'text/xml');
  }

  const responseJSON = JSON.stringify(content);
  if (content.id) {
    return respond(request, response, 401, responseJSON, 'application/json');
  }
  return respond(request, response, 200, responseJSON, 'application/json');
};

// returns a forbidden to access response
const forbidden = (request, response, acceptedType) => {
  const content = {
    message: 'You do not have access to this content.',
    id: 'forbidden',
  };

  if (acceptedType === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${content.message}</message>`;
    responseXML = `${responseXML} <id>${content.id}</id> </response>`;
    return respond(request, response, 403, responseXML, 'text/xml');
  }

  const responseJSON = JSON.stringify(content);
  return respond(request, response, 403, responseJSON, 'application/json');
};

// returns an internal server error response
const internal = (request, response, acceptedType) => {
  const content = {
    message: 'Internal Server Error. Something went wrong.',
    id: 'internalError',
  };

  if (acceptedType === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${content.message}</message>`;
    responseXML = `${responseXML} <id>${content.id}</id> </response>`;
    return respond(request, response, 500, responseXML, 'text/xml');
  }

  const responseJSON = JSON.stringify(content);
  return respond(request, response, 500, responseJSON, 'application/json');
};

// returns a not implemented error response
const notImplemented = (request, response, acceptedType) => {
  const content = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'notImplemented',
  };

  if (acceptedType === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${content.message}</message>`;
    responseXML = `${responseXML} <id>${content.id}</id> </response>`;
    return respond(request, response, 501, responseXML, 'text/xml');
  }

  const responseJSON = JSON.stringify(content);
  return respond(request, response, 501, responseJSON, 'application/json');
};

module.exports = {
  notImplemented,
  internal,
  unauthorized,
  success,
  badRequest,
  notFound,
  forbidden,
};
