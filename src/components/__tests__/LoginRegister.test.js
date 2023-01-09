import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoginRegister } from '../LoginRegister'
import { screen } from '@testing-library/react'


// Quand je clique sur le bouton après avoir rempli le formulaire, je me connecte
test('Quand les champs sont rempli, on devrais', async () => {
  const user = userEvent.setup()
  render(<LoginRegister />)

  const connexionButton = await screen.findByRole('button', {
    name: /Se connecter/i,
  })

  // screen.debug()
  user.click(connexionButton)
  // await expect(
  //   screen.findByRole('heading', { name: /AuthApp/i }),
  // ).resolves.toBeInTheDocument()
})
