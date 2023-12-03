const calculator = require('./program.js')

test('should know 1+1', () => {
  const expected = 2
  const actual = calculator.add(1, 1)
  expect(actual).toBe(expected)
})
