import { faker } from '@faker-js/faker'
import {
  EMAIL_NOT_VALID,
  EMAIL_REQUIRED,
  PASSWORD_REQUIRED,
  PASSWORD_REQUIREMENT,
} from '../constants'
import { validateForm } from '../helper'

describe('helper validateForm', () => {
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
