import { reactive, readonly } from 'vue'
import axios from 'axios'

import { Post } from '../types'

abstract class Store<T extends Object> {
  protected state: T

  constructor() {
    const data = this.data()
    this.state = reactive<T>(data) as T
  }

  protected abstract data(): T
  public getState(): T {
    return readonly(this.state) as T
  }
}

interface PostsState {
  all: Record<number, Post>
  ids: number[]
}


interface State {
  posts: PostsState
}

class PostsStore extends Store<State> {
  protected data(): State {
    return {
      posts: {
        all: {},
        ids: []
      }
    }
  }
  
  async fetchPosts() {
    const response = await axios.get<Post[]>('/posts')
    const ids: number[] = []
    const all: Record<string, Post> = {}
    console.log(response)
    for (const post of response.data) {
      if (!ids.includes(post.id)) {
        ids.push(post.id)
      }
      all[post.id] = post
    }

    this.state.posts.all = all
    this.state.posts.ids = ids
  }

  get allPosts(): Post[] {
    return this.state.posts.ids.map(id => this.state.posts.all[id])
  }
}

const store = new PostsStore()

export { store }