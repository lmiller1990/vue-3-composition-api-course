interface MinLength {
  name: 'min-length'
  length: number
}

interface MaxLength {
  name: 'max-length'
  length: number
}

export interface Status {
  valid: boolean
  message?: string
}

export type Rule = MinLength | MaxLength

const minLength = (n: number): MinLength => {
  return {
    name: 'min-length',
    length: n
  }
}

const maxLength = (n: number): MaxLength => {
  return {
    name: 'max-length',
    length: n
  }
}

interface Payload {
  value: string
  rules: Rule[]
}

const validate = (payload: Payload): Status => {
  for (const rule of payload.rules) {
    if (rule.name === 'min-length' && payload.value.length < rule.length) {
      return {
        valid: false,
        message: `The value is too short. Minimum length is ${rule.length}.`
      }
    }

    if (rule.name === 'max-length' && payload.value.length > rule.length) {
      return {
        valid: false,
        message: `The value is too long. Maximum length is ${rule.length}.`
      }
    }
  }

  return {
    valid: true,
  }
}

export {
  validate,
  minLength,
  maxLength,
}