import { PostsStore } from './index'
import { basePost as mockPost } from '../components/factories'

jest.mock('axios', () => ({
  get: () => {
    return {
      data: [mockPost]
    }
  }
}))

describe('PostsStore: fetchPosts', () => {
  it('fetches posts and updates the state', async () => {
    const store = new PostsStore()

    await store.fetchPosts()

    expect(store.allPosts).toEqual([ mockPost  ])
  })
})