import { FluxStore, PostsState, UsersState, createInitialState } from './index'
import { Post, User, NewUser } from '../types'
import {
  basePost as mockPost,
  baseUser as mockUser,
  baseUser,
} from '../components/factories'

let mockPostData: any = null

jest.mock('axios', () => ({
  post: (url: string, data: any) => new Promise(res => res({ data: mockPostData || data })),
  put: (url: string, data: any) => new Promise(res => res({ data })),
  get: (url: string, ) => {
    return {
      data: [mockPost]
    }
  }
}))

describe('createPost', () => {
  it('adds a new post to the state', async () => {
    const store = new FluxStore()
    await store.fetchPosts()
    expect(store.getState().posts).toEqual<PostsState>({
      ...store.getState().posts,
      ids: [mockPost.id],
      all: {
        [mockPost.id]: mockPost
      }
    })
  })
})

describe('signin', () => {
  it('updates the state with authenticated user', async () => {
    const store = new FluxStore()
    await store.signin(baseUser)
    expect(store.getState().users).toEqual<UsersState>({
      ...store.getState().users,
      all: {
        [baseUser.id]: {
          ...baseUser,
          isCurrentUser: true,
        }
      },
      ids: [baseUser.id]
    })
  })
})

describe('fetchPosts', () => {
  it('fetches posts and updates the state', async () => {
    const store = new FluxStore()

    await store.fetchPosts()

    expect(store.getState().posts).toEqual<PostsState>({
      loaded: true,
      ids: [mockPost.id],
      all: {
        [mockPost.id]: mockPost
      }
    })
  })
})

describe('updatePost', () => {
  it('updates a post', async () => {
    const store = new FluxStore({
      ...createInitialState(),
      posts: {
        loaded: false,
        ids: [mockPost.id],
        all: {
          [mockPost.id]: { ...mockPost, title: 'old' }
        }
      }
    })

    await store.updatePost({ ...mockPost, title: 'new' })

    expect(store.allPosts).toEqual<Post[]>([
      { ...mockPost, title: 'new' }
    ])
  })
})


describe('createUser', () => {
  beforeAll(() => {
    mockPostData = mockUser
  })

  afterAll(() => {
    mockPostData = null
  })

  it('creates a user', async () => {
    const newUser: NewUser = {
      email: mockUser.email,
      username: mockUser.username,
      password: 'password'
    }
    const store = new FluxStore()

    await store.createUser(newUser)

    expect(store.getState().users).toEqual<UsersState>({
      ...store.getState().users,
      all: {
        [mockUser.id]: mockUser
      },
      ids: [mockUser.id]
    })
  })
})

describe('authenticated', () => {
  it('returns true if authenticated', () => {
    const store = new FluxStore({
      ...createInitialState(),
      users: {
        loaded: false,
        ids: [mockUser.id],
        all: {
          [mockUser.id]: { ...mockUser, isCurrentUser: true }
        }
      }
    })

    expect(store.authenticated).toBe(true)
  })

  it('returns false when not authenticated', () => {
    const store = new FluxStore({
      ...createInitialState(),
      users: {
        loaded: false,
        ids: [mockUser.id],
        all: {
          [mockUser.id]: { ...mockUser, isCurrentUser: false }
        }
      }
    })

    expect(store.authenticated).toBe(false)
  })
})

describe('currentUser', () => {
  it('returns currentUser when present', () => {
    const store = new FluxStore({
      ...createInitialState(),
      users: {
        loaded: false,
        ids: [mockUser.id],
        all: {
          [mockUser.id]: { ...mockUser, isCurrentUser: true }
        }
      }
    })

    expect(store.currentUser).toEqual({ ...mockUser, isCurrentUser: true })
  })

  it('returns null when not present', () => {
    const store = new FluxStore({
      ...createInitialState(),
      users: {
        loaded: false,
        ids: [mockUser.id],
        all: {
          [mockUser.id]: { ...mockUser, isCurrentUser: false }
        }
      }
    })

    expect(store.currentUser).toBeUndefined()
  })
})

describe('logout', () => {
  it('logs out a current user', async () => {
    const store = new FluxStore({
      ...createInitialState(),
      users: {
        loaded: false,
        all: {
          [mockUser.id]: { ...mockUser, isCurrentUser: true }
        },
        ids: [mockUser.id]
      },
    })
    expect(store.currentUser).not.toBeUndefined()

    await store.logout()

    expect(store.currentUser).toBeUndefined()
  })
})
