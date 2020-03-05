import moment from 'moment'
import { Post } from '../types'

export const basePost: Post = {
  id: 1,
  title: 'My great post',
  content: 'Some interesting content',
  markdown: 'Some interesting content',
  created: moment(),
  authorId: 1,
  tags: [],
  likes: 10,
}

export const posts: Post[] = [
  {
    id: 1,
    title: 'My great post',
    content: 'Some interesting content',
    markdown: 'Some interesting content',
    created: moment(),
    authorId: 1,
    likes: 10,
    tags: []
  },
  {
    id: 2,
    title: 'My old post',
    content: 'Some interesting content',
    markdown: 'Some interesting content',
    created: moment().subtract(3, 'days'),
    authorId: 1,
    likes: 20,
    tags: []
  }
]