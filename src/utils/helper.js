import {
  EMAIL_NOT_VALID,
  EMAIL_REQUIRED,
  PASSWORD_REQUIRED,
  PASSWORD_REQUIREMENT,
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

export { validateForm }
