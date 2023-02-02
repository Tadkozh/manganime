import { render as renderReactTestingLib } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AppProviders } from '../context/index'

const wrapperContext = ({ children }) => {
  return (
    <AppProviders>
      <BrowserRouter>{children}</BrowserRouter>
    </AppProviders>
  )
}
const render = (ui, { ...options } = {}) => {
  return renderReactTestingLib(ui, { wrapper: wrapperContext, ...options })
}

export * from '@testing-library/react'
export { render, wrapperContext }
