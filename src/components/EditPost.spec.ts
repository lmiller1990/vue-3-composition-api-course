import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

import { basePost, createInitialState } from './factories'
import EditPost from './EditPost.vue'

const updatePostMock = jest.fn()

jest.mock('../store', () => ({
  useStore: () => {
    return {
      updatePost: updatePostMock,
      getState: () => ({
        ...createInitialState(),
        posts: {
          all: {
            [basePost.id]: basePost
          },
          ids: [basePost.id],
          loaded: true,
        }
      })
    }
  },
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

describe('EditPost', () => {
  it('calls updatePost and changes route', async () => {
    const wrapper = mount(EditPost)

    await wrapper.find('[data-test="submit"]').trigger('click')

    expect(updatePostMock).toHaveBeenCalledWith(basePost)
    expect(mockHistory).toEqual([`/posts/${basePost.id}`])
  })
})
