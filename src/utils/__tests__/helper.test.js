import { faker } from '@faker-js/faker'
import { AUTH_USER_NOT_FOUND } from '../../commons/constants'
import {
  EMAIL_NOT_VALID,
  EMAIL_REQUIRED,
  ERROR_UNKNOWN,
  PASSWORD_REQUIRED,
  PASSWORD_REQUIREMENT,
  USER_NOT_FOUND,
} from '../constants'
import { errorAuth, validateForm } from '../helper'

describe('validateForm', () => {
  test('Si email et mot de sont corrects, on retourne null', () => {
    const email = faker.internet.email()
    const password = faker.internet.password()

    const result = validateForm(email, password)
    expect(result).toBe(null)
  })

  test("Si l'email est vide ou null, on retourne une erreur", () => {
    const email = ''
    const password = faker.internet.password()

    const result = validateForm(email, password)

    expect(result.status).toBe(400)
    expect(result.message).toBe(EMAIL_REQUIRED)
  })
  test("Si l'email n'est pas valide, on retourne une erreur", () => {
    const email = 'wrong.email'
    const password = faker.internet.password()

    const result = validateForm(email, password)

    expect(result.status).toBe(400)
    expect(result.message).toBe(EMAIL_NOT_VALID)
  })
  test('Si le mot de passe es vide ou null, on retourne une erreur', () => {
    const email = faker.internet.email()
    const password = ''

    const result = validateForm(email, password)

    expect(result.status).toBe(400)
    expect(result.message).toBe(PASSWORD_REQUIRED)
  })
  test('Si la longeur du mot de passe est inférieur à six caractère, on retourne une erreur', () => {
    const email = faker.internet.email()
    const password = 'werwe' // -6

    const result = validateForm(email, password)

    expect(result.status).toBe(400)
    expect(result.message).toBe(PASSWORD_REQUIREMENT)
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
