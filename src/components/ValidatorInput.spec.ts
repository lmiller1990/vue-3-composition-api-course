import { mount } from '@vue/test-utils'

import { minLength } from './validate'
import ValidatorInput from './ValidatorInput.vue'

describe('ValidatorInput', () => {
  it('renders an error when present', async done => {
    const wrapper = mount(ValidatorInput, {
      props: {
        name: 'username',
        value: '',
        type: 'text',
        label: 'username',
        rules: [minLength(5)]
      }
    })
    expect(wrapper.find('.help').exists()).toBe(false)

    wrapper.find('input').setValue('aaaa')
    wrapper.find('input').trigger('keyup')

    setTimeout(() => {
      expect(wrapper.html()).toContain('The value is too short. Minimum length is 5.')
      expect(wrapper.emitted().validate[0]).toEqual([
        { name: 'username', valid: false }
      ])
      done()
    }, 600)
  })
})