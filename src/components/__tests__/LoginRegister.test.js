import userEvent from '@testing-library/user-event'
import { LoginRegister } from '../LoginRegister'
import { screen } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import { render } from '../../test/test-utils'
import { Navigate } from 'react-router-dom'

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
    expect(Navigate).toHaveBeenCalledWith({'to':'/profile'},{})

  })
  test.todo(
    `Quand on clique sur le lien 'créer un compte', le header et le texte du boutton change`,
  )
})
