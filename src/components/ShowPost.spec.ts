import { mount } from '@vue/test-utils'
import flushPromises from 'flush-promises'

import { State } from '../store'
import ShowPost from './ShowPost.vue'
import { basePost, createInitialState } from './factories'

jest.mock('vue-router', () => ({
  useRoute: () => ({
    value: { params: { id: basePost.id } }
  })
}))

const mockFetchPosts = jest.fn()

let mockLoaded = false
let mockUserId: number | undefined = undefined

jest.mock('../store', () => ({
  useStore: () => ({
    fetchPosts: mockFetchPosts,
    currentUser: {
      id: mockUserId
    },
    getState: (): State => ({
      ...createInitialState(),
      posts: {
        all: {
          [basePost.id]: {...basePost, authorId: 1}
        },
        ids: [basePost.id],
        loaded: mockLoaded
      }
    })
  })
}))

describe('ShowPost', () => {
  it('renders a loader when loading', () => {
    const wrapper = mount(ShowPost, {
      global: {
        components: {
          RouterLink: {
            template: '<div data-test="link" />'
          }
        }
      }
    })

    expect(wrapper.find('[data-test="loader"]').exists()).toBe(true)
  })

  it('renders a loader when loading', async () => {
    mockLoaded = false
    const wrapper = mount(ShowPost, {
      global: {
        components: {
          RouterLink: {
            template: '<div data-test="link" />'
          }
        }
      }
    })

    await flushPromises()

    expect(mockFetchPosts).toHaveBeenCalled()
    expect(wrapper.find('[data-test="loader"]').exists()).toBe(false)
    expect(wrapper.find('[data-test="link"]').exists()).toBe(false)
    expect(wrapper.html()).toContain(basePost.content)
  })

  it('renders edit button if current use is author', async () => {
    mockLoaded = false
    mockUserId = 1
    const wrapper = mount(ShowPost, {
      global: {
        components: {
          RouterLink: {
            template: '<div data-test="link" />'
          }
        }
      }
    })

    await flushPromises()

    expect(mockFetchPosts).toHaveBeenCalled()
    expect(wrapper.find('[data-test="loader"]').exists()).toBe(false)
    expect(wrapper.find('[data-test="link"]').exists()).toBe(true)
    expect(wrapper.html()).toContain(basePost.content)
  })
})