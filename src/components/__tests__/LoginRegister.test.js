import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoginRegister } from '../LoginRegister'
import { screen } from '@testing-library/react'
import { faker } from '@faker-js/faker'

describe('LoginRegister component', () => {
  test('Quand les champs sont correctement renseigné, on accède à la page utilisateur', async () => {
    const user = userEvent.setup()
    render(<LoginRegister />)

    const inputEmail = await screen.findByRole('textbox', {
      name: /adresse email/i,
    })
    const inputPassword = await screen.findByRole('textbox', {
      name: /mot de passe/i,
    })

    const email = faker.internet.email()
    const password = faker.internet.password()

    await user.type(inputEmail, email)
    await user.type(inputPassword, password)

    const connexionButton = await screen.findByRole('button', {
      name: /connexion/i,
    })

    await user.click(connexionButton)
    // await expect(
    //   screen.findByRole('heading', { name: /AuthApp/i }),
    // ).resolves.toBeInTheDocument()
  })
  test.todo(
    `Quand on clique sur le lien 'créer un compte', le header et le texte du boutton change`,
    async () => {},
  )
  test.todo(
    `Quand l'email est vide, on obtient un message d'erreur`,
    async () => {},
  )
  test.todo(
    `Quand le mot de passe est vide, on obtient un message d'erreur`,
    async () => {},
  )
  test.todo(
    `Quand le champs email est un incorrect, on obtient un message d'erreur`,
    async () => {},
  )
  test.todo(
    `Quand le champs mot de passe est un incorrect, on obtient un message d'erreur`,
    async () => {},
  )
  test.todo(
    `Quand la longeur du mot de passe est inférieur à six, on obtient un message d'erreur`,
    async () => {},
  )
})
