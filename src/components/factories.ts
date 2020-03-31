import moment from 'moment'
import { Post } from '../types'

export const basePost: Post = {
  id: 1,
  title: 'My great post',
  content: ``,
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
    content: `
<h1 id="my-great-post">My great post!</h1>
<p>this is a <em>really exciting</em> post.</p>
<p>we even support code snippets!</p>
<pre><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
&nbsp; <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'bar'</span>)
}</code></pre>`,
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