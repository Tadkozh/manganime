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

    const connexionButton = await screen.findByRole('button', {
      name: /connexion/i,
    })

    const testUser = screen.queryByText('Bonjour User')

    expect(testUser).not.toBeInTheDocument()
    await user.click(connexionButton)
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

    const createButton = screen.queryByRole('button', {
      name: 'Créer un compte',
    })
    await user.click(createButton)
    const submitCreateButton = screen.queryByRole('button', {
      name: 'Créer',
    })

    await user.type(inputEmail, email)
    await user.type(inputPassword, password)
    await user.click(submitCreateButton)

    expect(createUserWithEmailAndPassword).toHaveBeenLastCalledWith(
      auth,
      email,
      password,
    )
  })
  test(`Quand on clique sur le lien 'créer un compte', le header et le texte du boutton change`, async () => {
    const user = userEvent.setup()
    render(<LoginRegister />)

    const createButton = screen.queryByRole('button', {
      name: 'Créer un compte',
    })
    const loginButton = screen.queryByRole('button', {
      name: 'Se connecter',
    })

    const submitCreateButton = screen.queryByRole('button', {
      name: 'Créer',
    })
    const submitLoginButton = screen.queryByRole('button', {
      name: 'Connexion',
    })
    const header = screen.queryByRole('heading')

    expect(createButton).toBeInTheDocument()
    expect(loginButton).not.toBeInTheDocument()
    expect(submitLoginButton).toBeInTheDocument()
    expect(submitCreateButton).not.toBeInTheDocument()
    expect(header).toHaveTextContent('Se connecter')

    await user.click(createButton)

    expect(
      screen.queryByRole('button', {
        name: 'Créer un compte',
      }),
    ).not.toBeInTheDocument()
    expect(
      screen.getByRole('button', {
        name: 'Se connecter',
      }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('button', {
        name: 'Connexion',
      }),
    ).not.toBeInTheDocument()
    expect(
      screen.getByRole('button', {
        name: 'Créer',
      }),
    ).toBeInTheDocument()
    expect(header).toHaveTextContent('Créer un compte')
  })
})
