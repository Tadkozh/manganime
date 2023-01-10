import { faker } from '@faker-js/faker'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Navigate } from 'react-router-dom'
import { render } from '../../test/test-utils'
import { LoginRegister } from '../LoginRegister'

jest.mock('../../firebase-config', () => {
  return {
    initializeApp: jest.fn(),
    getAuth: jest.fn(),
    getFirestore: jest.fn(),
  }
})

jest.mock('firebase/auth', () => {
  return {
    signInWithEmailAndPassword: (email, password) =>
      Promise.resolve({
        user: {
          token: '123456',
          email: email,
        },
      }),
      setPersistence: () => Promise.resolve(),
  }
})

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Navigate: jest.fn(),
}))

describe('LoginRegister component', () => {
  test('Quand les champs sont correctement renseigné, on accède à la page utilisateur', async () => {
    const user = userEvent.setup()
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
    expect(Navigate).toHaveBeenCalledTimes(1)
    expect(Navigate).toHaveBeenCalledWith({ to: '/profile' }, {})
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
