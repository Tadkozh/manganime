import React from 'react'
import { render as renderReactTestingLib } from '@testing-library/react'
import { AppProviders } from '../context/index'

const wrapperContext = ({ children }) => {
  return <AppProviders>{children}</AppProviders>
}

const render = (ui, { ...options } = {}) => {
  return renderReactTestingLib(ui, { wrapper: AppProviders, ...options })
}

export * from '@testing-library/react'
export { render, wrapperContext }
