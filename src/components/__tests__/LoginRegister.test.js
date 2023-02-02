import { faker } from '@faker-js/faker'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { auth } from '../../firebase-config'
import { render } from '../../test/test-utils'
import { LoginRegister } from '../LoginRegister'

jest.mock('../MangAnimeHeader')

describe('LoginRegister component', () => {
  const user = userEvent.setup()

  test('Quand les champs sont correctement renseigné, on appelle la promise signInWithEmailAndPassword', async () => {
    render(<LoginRegister />)

    const inputEmail = await screen.findByRole('textbox', {
      name: /adresse email/i,
    })
    const inputPassword = await screen.findByLabelText(/mot de passe/i)
    const email = faker.internet.email()
    const password = faker.internet.password()

    await user.type(inputEmail, email)
    await user.type(inputPassword, password)

    const loginSubmitButton = await screen.findByLabelText(/loginSubmit/i)

    await user.click(loginSubmitButton)
    expect(signInWithEmailAndPassword).toHaveBeenLastCalledWith(
      auth,
      email,
      password,
    )
  })
  test('Quand les champs sont correctement renseigné, on appelle la promise createUserWithEmailAndPassword', async () => {
    render(<LoginRegister />)

    const inputEmail = await screen.findByRole('textbox', {
      name: /adresse email/i,
    })
    const inputPassword = await screen.findByLabelText(/mot de passe/i)
    const email = faker.internet.email()
    const password = faker.internet.password()

    const registerButton = await screen.findByLabelText(/registerAccount/)

    await user.click(registerButton)
    const registerSubmitButton = await screen.findByLabelText(/registerSubmit/)

    await user.type(inputEmail, email)
    await user.type(inputPassword, password)
    await user.click(registerSubmitButton)

    expect(createUserWithEmailAndPassword).toHaveBeenLastCalledWith(
      auth,
      email,
      password,
    )
  })
  test(`Quand on clique sur le lien 'créer un compte', le header et le texte du boutton change`, async () => {
    const user = userEvent.setup()
    render(<LoginRegister />)

    const registerButton = screen.queryByLabelText(/registerAccount/)
    const loginButton = screen.queryByLabelText(/loginAccount/)

    const registerSubmitButton = screen.queryByLabelText(/registerSubmit/)
    const loginSubmitButton = screen.queryByLabelText(/loginSubmit/)

    const header = screen.queryByRole('heading')

    expect(registerButton).toBeInTheDocument()
    expect(loginButton).not.toBeInTheDocument()
    expect(loginSubmitButton).toBeInTheDocument()
    expect(registerSubmitButton).not.toBeInTheDocument()
    expect(header).toHaveTextContent(/Sign in/)

    await user.click(registerButton)

    expect(screen.queryByLabelText(/registerAccount/)).not.toBeInTheDocument()
    expect(screen.getByLabelText(/loginAccount/)).toBeInTheDocument()
    expect(screen.queryByLabelText(/loginSubmit/)).not.toBeInTheDocument()
    expect(screen.getByLabelText(/registerSubmit/)).toBeInTheDocument()
    expect(header).toHaveTextContent(/Sign up/)
  })
})
