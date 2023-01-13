import { changeTheme, getDesignTokens, sameTheme } from '..'
import { DARK, LIGHT } from '../../commons/constants'
import { palettes } from '..'

describe('getDesignTokens fonction', () => {
  test('Si le mode est light alors on récupère la palette light', () => {
    const result = getDesignTokens(LIGHT)
    expect(result.palette).toStrictEqual(palettes.light)
  })
  test('Si le mode est dark alors on récupère la palette dark', () => {
    const result = getDesignTokens(DARK)
    expect(result.palette).toStrictEqual(palettes.dark)
  })
})

describe('changeTheme fonction', () => {
  test('Si le mode est LIGHT passe par la fonction changeTheme alors il retourne DARK', () => {
    const result = changeTheme(LIGHT)
    expect(result).toBe(DARK)
  })
  test('Si le mode est DARK passe par la fonction changeTheme alors il retourne LIGHT', () => {
    const result = changeTheme(DARK)
    expect(result).toBe(LIGHT)
  })
})

describe('sameTheme fonction', () => {
  test('Si le mode est LIGHT alors il retourne LIGHT', () => {
    const result = sameTheme(LIGHT)
    expect(result).toBe(LIGHT)
  })
  test('Si le mode est DARK alots il retourn DARK', () => {
    const result = sameTheme(DARK)
    expect(result).toBe(DARK)
  })
})
