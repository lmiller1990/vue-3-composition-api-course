import flushPromises from 'flush-promises'
import { mount } from '@lmiller1990/vue-test-utils-next'

import { useStore, createInitialState } from '../store'
import NewPost from './NewPost.vue'
import { basePost } from './factories'

const mockCreatePost = jest.fn()
jest.mock('../store', () => ({
  useStore: () => {
    return {
      createPost: mockCreatePost
    }
  },
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

describe('NewPost', () => {
  it('creates a post when submitted', async () => {
    const wrapper = mount(NewPost)

    await wrapper.find('[data-test="submit"]').trigger('click')

    expect(mockCreatePost).toHaveBeenCalled()
    expect(mockHistory).toEqual(['/'])
  })
})
