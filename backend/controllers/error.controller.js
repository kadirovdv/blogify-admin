const ErrorMessage = require("../utils/error.handler");

// Error handling

const handleCastError = (error) => {
  const message = `Invalid identifier: ${error.value}`;

  return new ErrorMessage(message, 400);
}

const handleDuplicateValue = (error) => {
  const value = Object.values(error.keyValue)[0];

  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new ErrorMessage(message, 400);
};

const handleValidationValue = (error) => {
  const value = Object.values(error.errors)[0];

  const message = `Validation error: ${value}`;
  return new ErrorMessage(message, 400);
}


const handleRequiredValue = (error) => {
  const value = Object.values(error.errors)[0];

  const message = `Missing: ${value}`;
  return new ErrorMessage(message, 400);
}

const handleJWTError = (error) => {
  return new ErrorMessage("You're logged out, please login again!", 401);
}

const handleJWTExpired = (error) => {
  return new ErrorMessage("Your session has expired, please login again!", 401);
}

// 

const sendDevError = (error, response) => {
  response.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    stack: error.stack,
    error: error,
    _message: error._message
  });
};


const sendProdError = (error, response) => {
  if(error.operational) {
    response.status(error.statusCode).json({
      status: error.status,
      message: error.message
    });
  } else {
    response.status(500).json({
      status: "Bad Request",
      message: "Invalid request was received"
    });
  }
}

module.exports = (error, request, response, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "Internal Server Error";

  if (process.env.NODE_ENV === "development") {
    if(error.name === "TokenExpiredError") error = handleJWTExpired(error);
    sendDevError(error, response);
  } else if (process.env.NODE_ENV === "production") {
    let err = { ...error };
    if(err.kind === "ObjectId") err = handleCastError(err);
    if(err.code === 11000) err = handleDuplicateValue(err);
    if(Object.values(err.errors)[0].kind === "maxlength") err = handleValidationValue(err);
    if(Object.values(err.errors)[0].kind === "minlength") err = handleValidationValue(err);
    if(Object.values(err.errors)[0].kind === "required") err = handleRequiredValue(err);
    if(err.name === "JsonWebTokenError") err = handleJsonWebTokenError(err);
    if(err.name === "TokenExpiredError") err = handleJWTExpired(err); 
    sendProdError(err, response);
  }
};
