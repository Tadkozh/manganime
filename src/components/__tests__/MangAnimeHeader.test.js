import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTE_HOME } from '../../commons/constants'
import { render } from '../../test/test-utils'
import { LOG_IN, LOG_OUT, PROFILE } from '../../utils/constants'
import MangAnimeHeader from '../MangAnimeHeader'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}))

describe('first', () => {
  const user = userEvent.setup()

  // test('Quand on clique sur le logo navigate est appelé', async () => {
  //   render(<MangAnimeHeader />)
  //   const logoDesktop = screen.getByRole('img', {
  //     name: 'Logo MangAnime desktop',
  //   })
  //   const logoMobile = screen.getByRole('img', {
  //     name: /Logo MangAnime mobile/i,
  //   })

  //   expect(useNavigate).toBeCalledTimes(0)
  //   expect(useNavigate).not.toBeCalledWith(ROUTE_HOME)

  //   await user.click(logoDesktop)
  //   // expect(useNavigate).toBeCalledTimes(1)
  // })

  test.todo(
    `Quand on clique sur le logo lorsqu'on est pas à l'accueil, navigate est pas appelé avec la route '${ROUTE_HOME}'`,
  )
  test.todo("Quand on clique sur l'avatar, le sous-menu apparait")
  test.todo('Quand on clique sur un item du sous-menu, alors le menu disparaît')
  test.todo('Quand on clique en dehors du sous-menu, alors le menu se ferme')
  test.todo(
    `Quand on est pas connecté alors on à accès à '${LOG_IN}' dans le sous-menu`,
  )
  test.todo(
    `Quand on est connecté, on a accès au '${PROFILE}' et '${LOG_OUT}' dans le sous-menu`,
  )
  test.todo(
    `Quand on est connecté, quand on clique sur '${LOG_OUT}' alors on est redirigé vers la page d'accueil`,
  )
})
// const history = createMemoryHistory({
//   initialEntries: [ROUTE_LOGIN_REGISTER],
// })
// const wrapper = ({ children }) => {
//   return (
//     <AppProviders>
//       <Router navigator={history} location={history.location}>{children}</Router>
//     </AppProviders>
//   )
// }
