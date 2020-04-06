import { validate, minLength, maxLength, Status } from './validate'

describe('validate', () => {
  it('returns invalid due when too short', () => {
    const result = validate({ 
      value: '1234',
      rules: [minLength(5)]
    })

    const expected: Status = {
      valid: false,
      message: 'The value is too short. Minimum length is 5.'
    }

    expect(result).toEqual(expected)
  })

  it('returns invalid due when too long', () => {
    const result = validate({ 
      value: '12345678',
      rules: [maxLength(5)]
    })

    const expected: Status = {
      valid: false,
      message: 'The value is too long. Maximum length is 5.'
    }

    expect(result).toEqual(expected)
  })

  it('returns valid when length is within limits', () => {
    const result = validate({ 
      value: '1234',
      rules: [minLength(3), maxLength(5)]
    })

    const expected: Status = {
      valid: true,
      message: undefined
    }

    expect(result).toEqual(expected)
  })
})