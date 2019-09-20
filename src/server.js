// get all required modules
const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonXmlHandler = require('./jsonXmlResponses.js');

// find correct port to use
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// method to call when a request is received
const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query); // get all query parameters
  const acceptedType = request.headers.accept.split(',')[0]; // assume only one accepted type is sent, either xml or json
  // call appropriate handler method
  switch (parsedUrl.pathname) {
    case '/':
      htmlHandler.getIndex(request, response);
      break;
    case '/style.css':
      htmlHandler.getCSS(request, response);
      break;
    case '/badRequest':
      jsonXmlHandler.badRequest(request, response, params, acceptedType);
      break;
    case '/success':
      jsonXmlHandler.success(request, response, acceptedType);
      break;
    case '/unauthorized':
      jsonXmlHandler.unauthorized(request, response, params, acceptedType);
      break;
    case '/forbidden':
      jsonXmlHandler.forbidden(request, response, acceptedType);
      break;
    case '/internal':
      jsonXmlHandler.internal(request, response, acceptedType);
      break;
    case '/notImplemented':
      jsonXmlHandler.notImplemented(request, response, acceptedType);
      break;
    default:
      jsonXmlHandler.notFound(request, response, acceptedType);
      break;
  }
};

http.createServer(onRequest).listen(port);
