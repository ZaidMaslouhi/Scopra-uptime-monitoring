const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UN_AUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_ERROR: 500
}

class AppError extends Error {
  constructor (name, statusCode, description) {
    super(description)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = name
    this.statusCode = statusCode
    Error.captureStackTrace(this)
  }
}

// 500 Internal Error
class APIError extends AppError {
  constructor (description = 'api error') {
    super(
      'api internal server error',
      STATUS_CODES.INTERNAL_ERROR,
      description
    )
  }
}

// 400 Validation Error
class BadRequestError extends AppError {
  constructor (description = 'bad request') {
    super('bad request', STATUS_CODES.BAD_REQUEST, description)
  }
}

// 401 Forbidden Error
class UnauthorizedError extends AppError {
  constructor (description = 'unauthorized') {
    super('unauthorized', STATUS_CODES.UN_AUTHORIZED, description)
  }
}

// 403 Forbidden Error
class ForbiddenError extends AppError {
  constructor (description = 'access denied') {
    super('access denied', STATUS_CODES.FORBIDDEN, description)
  }
}

// 404 Not Found Error
class NotFoundError extends AppError {
  constructor (description = 'not found') {
    super('not found', STATUS_CODES.NOT_FOUND, description)
  }
}

// 409 Conflict Error
class ConflictError extends AppError {
  constructor (description = 'conflict') {
    super('conflict', STATUS_CODES.CONFLICT, description)
  }
}

module.exports = {
  AppError,
  APIError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError
}
