import { expect, it } from 'vitest'
import { sum } from '..'

it('should return the sum of two numbers', () => {
  expect(sum(2, 3)).toBe(5)
  expect(sum(10, 5)).toBe(15)
  expect(sum(-2, 5)).toBe(3)
})
