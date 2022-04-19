import test from 'ava'

import { sum, minus, mul, div } from '../index.js'

test('sum from native', (t) => {
  t.is(sum(1, 2), 3)
})

test('minus from native', (t) => {
  t.is(minus(10, 3), 7)
})

test('mul from native', (t) => {
  t.is(mul(10, 3), 30)
})

test('div from native', (t) => {
  t.is(div(10, 3), 3)
})
