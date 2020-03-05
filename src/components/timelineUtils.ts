import moment from 'moment'
import { Post, TimePeriod } from '../types'

export function filterPosts(posts: Post[], timePeriod: TimePeriod): Post[] {
  if (timePeriod === 'today') {
    return posts.filter(post => post.created.isSameOrAfter(moment().subtract(1, 'day')))
  }

  return posts
}
