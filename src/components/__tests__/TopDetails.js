import React from 'react'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TopDetails from '../TopDetails'

const datas = [
  { title: '', images: { jpg: { imageUrl: 'test' } } },
  { title: '', images: { jpg: { imageUrl: 'test' } } },
]

jest.mock('axios')
// jest.mock('../../hooks/getTopDatas', () => {
//   return {
//     useGetTopDatas: () =>
//       Promise.resolve({
//         datas,
//       }),
//   }
// })
jest.mock('../../hooks/getTopDatas', () => {
  return jest.fn(() => {
    console.log('bla')
    return datas
  })
})

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

const server = setupServer(
  rest.get('https://api.jikan.moe/v4/top/anime', (res, req, ctx) => {
    return res(ctx.json().data)
  }),
)

test('Rendu de top Animes', async () => {
  render(<TopDetails name={'Animes'} />)

  const searchBtn = screen.getByRole('button', { name: 'Search Animes' })
  const list = screen.getByRole('list', { name: '' })
  const listItem = screen.queryByRole('listitem', { name: 'anime-item' })
  expect(list).toBeInTheDocument()
  expect(listItem).not.toBeInTheDocument()
  await userEvent.click(searchBtn)
  screen.debug()
  //   expect(
  //     screen.getByRole('listitem', { name: 'anime-item' }),
  //   ).toBeInTheDocument()
})
