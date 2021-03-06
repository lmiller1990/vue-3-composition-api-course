import flushPromises from 'flush-promises'
import { mount } from '@vue/test-utils'

import { 
  useStore, 
  UsersState
} from '../store'
import Login from './Login.vue'
import { basePost, baseUser, E401 } from './factories'

let mockShouldThrow = false
jest.mock('axios', () => ({
  post: () => {
    if (mockShouldThrow) {
      throw new E401()
    }

    return new Promise(res => res({ data: baseUser }))
  }
}))

let mockHistory: string[] = []
jest.mock('vue-router', () => ({
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

  it.only('shows an error message', async () => {
    mockShouldThrow = true
    const store = useStore()
    const wrapper = mount(Login)

    await wrapper.find('[data-test="submit"]').trigger('submit')
    await flushPromises()

    expect(wrapper.html()).toContain('Email or password is incorrect')
  })
})
