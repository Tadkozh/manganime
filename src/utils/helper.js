import {
  AUTH_EMAIL_EXISTS,
  AUTH_REQUIRE_RECENT_LOGIN,
  AUTH_TOO_MANY_REQUEST,
  AUTH_USER_ALREADY_EXIST,
  AUTH_USER_NOT_FOUND,
  AUTH_WRONG_PASSWORD,
} from '../commons/constants'
import {
  EMAIL_EXIST,
  EMAIL_NOT_VALID,
  EMAIL_REQUIRED,
  ERROR_UNKNOWN,
  PASSWORD_REQUIRED,
  PASSWORD_REQUIREMENT,
  TOO_MANY_REQUEST,
  USERNAME_REQUIRED,
  USERNAME_TOO_SHORT,
  USER_EXSIT,
  USER_NOT_FOUND,
  USER_SIGN_IN_AGAIN,
  WRONG_PASSWORD,
} from './constants'

const validationSignForm = (email, password) => {
  const errorEmail = validationEmail(email)
  const errorPassword = validationPassword(password)
  if (errorEmail) {
    return errorEmail
  }
  if (errorPassword) {
    return errorPassword
  }
  return null
}

const validationProfileForm = (newUser) => {
  const errorEmail = validationEmail(newUser.email)
  const errorPassword = validationPassword(newUser.password, true)
  const errorUsername = validationUsername(newUser.name)
  if (errorEmail) {
    return errorEmail
  }
  if (errorPassword) {
    return errorPassword
  }
  if (errorUsername) {
    return errorUsername
  }
  return null
}

const validationUsername = (username) => {
  if (!username) {
    return errorGenerator(USERNAME_REQUIRED)
  }
  if (username.length < 3) {
    return errorGenerator(USERNAME_TOO_SHORT)
  }
  return null
}

const validationEmail = (email) => {
  const expression =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const rex = new RegExp(expression, 'g')
  if (!email) {
    return errorGenerator(EMAIL_REQUIRED)
  }
  if (!rex.test(email)) {
    return errorGenerator(EMAIL_NOT_VALID)
  }
  return null
}

const validationPassword = (password, isProfile = false) => {
  if (!isProfile || (isProfile && password)) {
    if (!password) {
      return errorGenerator(PASSWORD_REQUIRED)
    }
    if (password.length < 6) {
      return errorGenerator(PASSWORD_REQUIREMENT)
    }
  }
  return null
}
const errorGenerator = (message, status = 400) => {
  if (!message) {
    throw new Error(`message empty or null when call ${errorGenerator.name}`)
  }
  const error = new Error(message)
  error.code = status
  return error
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
    case AUTH_REQUIRE_RECENT_LOGIN:
      message = USER_SIGN_IN_AGAIN
      break
    default:
      message = error.code
      break
  }
  const newError = {
    code: 400,
    message: message ?? ERROR_UNKNOWN,
  }
  return newError
}

const getImageName = (url) => {
  if (!url) {
    throw new Error(`message empty or null when call ${errorGenerator.name}`)
  }
  const text = url.split(/[/]/)
  const image = text[text.length - 1]
  const imageSplit = image.split(/[.]/)

  return imageSplit[0]
}

const getRandomNumber = () => {
  const min = 1
  const max = 10
  return Math.round(Math.random() * (max - min) + min)
}

const getUrl = (paths = []) => {
  if (paths.length === 0) {
    throw new Error(`routes empty when call ${getUrl.name}`)
  }
  return paths?.map((path) => `/${path}`).join('')
}

const capFirstLetter = (text) => {
  if (!text) {
    throw new Error(`text empty when call ${capFirstLetter.name}`)
  }
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export {
  errorGenerator,
  validationProfileForm,
  validationSignForm,
  validationEmail,
  validationUsername,
  validationPassword,
  errorAuth,
  getImageName,
  getRandomNumber,
  getUrl,
  capFirstLetter,
}
