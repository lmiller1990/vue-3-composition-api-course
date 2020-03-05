import { Moment } from 'moment'

export type TimePeriod = 'today' | 'this week' | 'this month'

export interface Post {
  id: number
  title: string
  content: string
  markdown: string
  created: Moment
  authorId: number
  likes: number
  tags: string[]
}


