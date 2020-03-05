import moment from 'moment'
import { Post } from '../types'

import { basePost } from './factories'
import { filterPosts } from './timelineUtils'

const todayPost: Post = {...basePost, created: moment()}
const thisWeekPost: Post = {
  ...basePost, created: moment().subtract(4, 'days')
}

describe('filterPosts', () => {
  it('filters posts from today', () => {
    const actual = filterPosts([todayPost, thisWeekPost], 'today') 
    const expected: Post[] = [todayPost]

    expect(actual).toEqual(expected)
  })

  it('filters posts from this week', () => {
    const actual = filterPosts([todayPost, thisWeekPost], 'this week') 
    const expected: Post[] = [todayPost, thisWeekPost]

    expect(actual).toEqual(expected)
  })
})

