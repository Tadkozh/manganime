// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
import { DONE } from './commons/constants'
import { useUserData } from './hooks/useUserData'

jest.mock('./firebase-config', () => {
  return {
    initializeApp: jest.fn(),
    auth: jest.fn(),
    getFirestore: jest.fn(),
  }
})

jest.mock('firebase/auth', () => {
  return {
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    onAuthStateChanged: jest.fn(),
  }
})

jest.mock('./hooks/useUserData', () => ({ useUserData: jest.fn() }))

beforeEach(() => {
  useUserData.mockReturnValue({
    data: null,
    status: DONE,
    error: null,
    setError: jest.fn(),
    setData: jest.fn(),
    execute: jest.fn(),
  })
})
