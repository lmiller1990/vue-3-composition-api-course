import flushPromises from 'flush-promises'
import { mount } from '@lmiller1990/vue-test-utils-next'

import { 
  useStore, 
  UsersState
} from '../store'
import Login from './Login.vue'
import { basePost, baseUser, E } from './factories'

let mockShouldThrow = false
jest.mock('axios', () => ({
  default: {
    post: () => {
      if (mockShouldThrow) {
        throw new E()
      }

      return new Promise(res => res({ data: baseUser }))
    }
  }
}))

let mockHistory: string[] = []
jest.mock('@posva/vue-router-next', () => ({
  useRouter: () => mockHistory,
  useRoute: () => ({
    value: {
      params: {
        id: basePost.id
      }
    }
  })
}))

describe('Login', () => {
  it('logs in succesfully', async () => {
    const store = useStore()
    const wrapper = mount(Login)

    await wrapper.find('[data-test="email"]').setValue('test@test.com')
    await wrapper.find('[data-test="password"]').setValue('password123')
    await wrapper.find('[data-test="submit"]').trigger('submit')
    await flushPromises()

    expect(store.getState().users).toEqual<UsersState>({
      ids: [baseUser.id],
      all: {
        [baseUser.id]: { ...baseUser, isCurrentUser: true }
      },
      loaded: false,
    })
    expect(mockHistory).toEqual(['/'])
  })

  it('shows an error message', async () => {
    mockShouldThrow = true
    const store = useStore()
    const wrapper = mount(Login)

    await wrapper.find('[data-test="submit"]').trigger('submit')
    await flushPromises()

    expect(wrapper.html()).toContain('Email or password is incorrect')
  })
})
