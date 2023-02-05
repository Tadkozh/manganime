// import React from 'react'
// import { setupServer } from 'msw/node'
// import { rest } from 'msw'
// import { render, screen } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
// import TopDetails from '../TopDetails'

// const { topDatas } = [
//   {
//     title: 'title',
//     images: { jpg: { imageUrl: 'imageurl' } },
//     genres: [{ type: 'anime' }],
//   },
//   {
//     title: 'title',
//     images: { jpg: { imageUrl: 'imageurl' } },
//     genres: [{ type: 'anime' }],
//   },
// ]

// jest.mock('../../hooks/getTopDatas', () => {
//   return jest.fn(() => {
//     return { topDatas }
//   })
// })

// const server = setupServer(
//   rest.get('https://api.jikan.moe/v4/top/anime', (res, req, ctx) => {
//     return res(ctx.json().data)
//   }),
// )

// beforeAll(() => server.listen())
// afterAll(() => server.close())
// afterEach(() => server.resetHandlers())

// test('Rendu de top Animes', () => {
//   render(<TopDetails name={'anime'} />)

//   // const list = screen.getByRole('list', { name: '' })
//   // const listItem = screen.queryByRole('listitem', { name: 'anime-item' })
//   // expect(list).toBeInTheDocument()
//   // expect(listItem).not.toBeInTheDocument()

//   // screen.debug()
//   //   expect(
//   //     screen.getByRole('listitem', { name: 'anime-item' }),
//   //   ).toBeInTheDocument()
// })

test.todo('Rendu de top Animes')
