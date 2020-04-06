import flushPromises from 'flush-promises'
import { mount } from '@lmiller1990/vue-test-utils-next'

import NewUser from './NewUser.vue'
import { basePost } from './factories'

let mockHistory: string[] = []
jest.mock('@posva/vue-router-next', () => ({
  useRouter: () => mockHistory,
}))

const mockCreateUser = jest.fn()
jest.mock('../store', () => ({
  useStore: () => ({
    createUser: mockCreateUser
  })
}))

describe('NewUser', () => {
  it('renders validation errors', async (done) => {
    const wrapper = mount(NewUser)

    const $component = wrapper.find<HTMLDivElement>('[data-test="username"]')
    const $input = $component.find<HTMLInputElement>('input')
      
    if ($input) {
      await $input.setValue('a')
      await $input.trigger('keyup')
    }

    await wrapper.find('[data-test="form"]').trigger('submit')
    setTimeout(() => {
      expect(wrapper.html()).toContain('The value is too short. Minimum length is 5.')
      done()
    }, 600)
  })

  it('calls createUser action with correct data', async (done) => {
    const wrapper = mount(NewUser)

    const type = async (input: string, value: string) => {
      const $component = wrapper.find<HTMLDivElement>(`[data-test="${input}"]`)
      const $input = $component.find<HTMLInputElement>('input')

      // @ts-ignore
      await $input.setValue(value)
      // @ts-ignore
      await $input.trigger('keyup')
    }

    type('username', 'Lachlan'),
    type('password', 'password'),
    type('email', 'email@email.com')

    setTimeout(async () => {
      await wrapper.find('[data-test="form"]').trigger('submit')
      expect(mockCreateUser).toHaveBeenCalledWith({
        username: 'Lachlan',
        password: 'password',
        email: 'email@email.com'
      })
      expect(mockHistory).toEqual(['/'])
      done()
    }, 600)
  })
})
