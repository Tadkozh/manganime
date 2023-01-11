import {
  AUTH_EMAIL_EXISTS,
  AUTH_TOO_MANY_REQUEST,
  AUTH_USER_ALREADY_EXIST,
  AUTH_USER_NOT_FOUND,
  AUTH_WRONG_PASSWORD
} from '../commons/constants'
import {
  EMAIL_EXIST,
  EMAIL_NOT_VALID,
  EMAIL_REQUIRED,
  PASSWORD_REQUIRED,
  PASSWORD_REQUIREMENT,
  TOO_MANY_REQUEST,
  USER_EXSIT,
  USER_NOT_FOUND,
  WRONG_PASSWORD
} from './constants'

const validateForm = (email, password) => {
  const expression =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const rex = new RegExp(expression, 'g')

  if (!email) {
    const error = new Error(EMAIL_REQUIRED)
    error.status = 400
    return error
  }
  if (!rex.test(email)) {
    const error = new Error(EMAIL_NOT_VALID)
    error.status = 400
    return error
  }
  if (!password) {
    const error = new Error(PASSWORD_REQUIRED)
    error.status = 400
    return error
  }
  if (password.length < 6) {
    const error = new Error(PASSWORD_REQUIREMENT)
    error.status = 400
    return error
  }
  return null
}

const errorAuth = (error) => {
  let message
  switch (error.code) {
    case AUTH_USER_NOT_FOUND:
      message = USER_NOT_FOUND
      break
    case AUTH_WRONG_PASSWORD:
      message = WRONG_PASSWORD
      break
    case AUTH_TOO_MANY_REQUEST:
      message = TOO_MANY_REQUEST
      break
    case AUTH_USER_ALREADY_EXIST:
      message = USER_EXSIT
      break
    case AUTH_EMAIL_EXISTS:
      message = EMAIL_EXIST
      break
    default:
      message = error.message
      break
  }
  const newError = {
    code: 400,
    message: message,
  }
  return newError
}

export { validateForm, errorAuth }
