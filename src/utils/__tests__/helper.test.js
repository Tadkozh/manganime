import { faker } from '@faker-js/faker'
import { AUTH_USER_NOT_FOUND } from '../../commons/constants'
import {
  EMAIL_NOT_VALID,
  EMAIL_REQUIRED,
  ERROR_UNKNOWN,
  PASSWORD_REQUIRED,
  PASSWORD_REQUIREMENT,
  USERNAME_REQUIRED,
  USERNAME_TOO_SHORT,
  USER_NOT_FOUND,
} from '../constants'
import {
  capFirstLetter,
  errorAuth,
  errorGenerator,
  getImageName,
  getRandomNumber,
  getUrl,
  validationEmail,
  validationPassword,
  validationUsername,
} from '../helper'

describe('validationUsername', () => {
  test('Si username est  vide alors on retourne une erreur', () => {
    const username = ''
    const result = validationUsername(username)

    expect(result.code).toBe(400)
    expect(result.message).toBe(USERNAME_REQUIRED)
  })
  test('Si username est une chaine de caractère < 3 alors on retourne une erreur', () => {
    const username = 'Le'
    const result = validationUsername(username)

    expect(result.code).toBe(400)
    expect(result.message).toBe(USERNAME_TOO_SHORT)
  })
  test('Si username est valide alors on retourne null', () => {
    const username = faker.internet.userName()
    const result = validationUsername(username)

    expect(result).toBe(null)
  })
})

describe('validationEmail', () => {
  test("Si l'email est vide,null, on retourne une erreur", () => {
    const email = ''
    const result = validationEmail(email)

    expect(result.code).toBe(400)
    expect(result.message).toBe(EMAIL_REQUIRED)
  })
  test("Si l'email n'est pas valide, on retourne une erreur", () => {
    const email = 'wrong.email'
    const result = validationEmail(email)

    expect(result.code).toBe(400)
    expect(result.message).toBe(EMAIL_NOT_VALID)
  })
  test('Si email est valide, on retourne null', () => {
    const email = faker.internet.email()
    const result = validationUsername(email)

    expect(result).toBe(null)
  })
})

describe('validationPassword', () => {
  test('Si le mot de passe est vide,null, on retourne une erreur', () => {
    const password = ''
    const result = validationPassword(password)

    expect(result.code).toBe(400)
    expect(result.message).toBe(PASSWORD_REQUIRED)
  })
  test('Si la longeur du mot de pasee < 6, on retourne une erreur', () => {
    const password = 'werwe'

    const result = validationPassword(password)

    expect(result.code).toBe(400)
    expect(result.message).toBe(PASSWORD_REQUIREMENT)
  })
  test('Si le mot de passe est valide, on retourne null', () => {
    const password = faker.internet.password()
    const result = validationPassword(password)

    expect(result).toBe(null)
  })
})

describe('errorGenerator', () => {
  test('Si le message vide,null on déclenche une exception', () => {
    const message = ''

    expect(() => errorGenerator(message)).toThrowErrorMatchingInlineSnapshot(
      `"message empty or null when call errorGenerator"`,
    )
  })
  test('Si le message est valide alors on retourne un objet error', () => {
    const message = PASSWORD_REQUIREMENT
    const result = errorGenerator(message)

    expect(result.code).toBe(400)
    expect(result.message).toBe(message)
  })
  test('Si on fourni un status alors celui retourne un objet error avec ce status', () => {
    const message = PASSWORD_REQUIREMENT
    const status = 404
    const result = errorGenerator(message, status)

    expect(result.code).toBe(status)
    expect(result.message).toBe(message)
  })
})

describe('errorAuth', () => {
  test(`Si l'erreur est code d'erreur géré alors on a un message personnalisé`, () => {
    const error = {
      code: AUTH_USER_NOT_FOUND,
    }

    const result = errorAuth(error)
    expect(result.code).toBe(400)
    expect(result.message).toBe(USER_NOT_FOUND)
  })
  test(`Si l'erreur est code d'erreur non géré alors on a un message de firebase`, () => {
    const error = {
      code: 'auth/error-auth-email',
    }
    const result = errorAuth(error)
    expect(result.code).toBe(400)
    expect(result.message).toBe(error.code)
  })
  test(`Si l'erreur n'est pas défini, alors on à un message d'erreur par défaut`, () => {
    const error = {
      code: null,
    }
    const result = errorAuth(error)
    expect(result.code).toBe(400)
    expect(result.message).toBe(ERROR_UNKNOWN)
  })
})

describe('getImageName', () => {
  test("Si l'url est vide,null on déclenche une exception", () => {
    const url = null

    expect(() => getImageName(url)).toThrowErrorMatchingInlineSnapshot(
      `"message empty or null when call errorGenerator"`,
    )
  })

  test("Si l'url est valide alors il retourne le nom de l'image", () => {
    const url = `http://websiteTest/test.jpg`
    const result = getImageName(url)

    expect(result).toBe('test')
  })
})

describe('getRandomNumber', () => {
  test('Retourne une valeur entre 1 et 10', () => {
    const min = 1
    const max = 10

    expect(getRandomNumber()).toBeGreaterThanOrEqual(min)
    expect(getRandomNumber()).toBeLessThanOrEqual(max)
  })
})

describe('getUrl', () => {
  test('Si paths est un tableau vide ou null, on déclenche une exception', () => {
    const paths = []
    expect(() => getUrl(paths)).toThrowErrorMatchingInlineSnapshot(
      `"routes empty when call getUrl"`,
    )
  })
  test('Si paths est un tableau valide on retourne le path final', () => {
    const paths = ['anime', 'info', 12]
    const result = getUrl(paths)

    expect(result).toBe('/anime/info/12')
  })
})

describe('capFirstLetter', () => {
  test('Si le texte est vide ou null on déclenche une exception', () => {
    const text = ''
    expect(() => capFirstLetter(text)).toThrowErrorMatchingInlineSnapshot(
      `"text empty when call capFirstLetter"`,
    )
  })
  test('Si le text est valide on retourne le texte avec la première lettre en majuscule', () => {
    const text = 'ceci est un test.'
    const result = capFirstLetter(text)

    expect(result).toBe('Ceci est un test.')
  })
})
