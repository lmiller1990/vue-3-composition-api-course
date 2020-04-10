import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

import PostWriter from './PostWriter.vue'
import { basePost } from './factories'

describe('PostWriter', () => {
  it('converts the post content to markdown on first render', async () => {
    const wrapper = mount(PostWriter, {
      props: {
        post: {
          ...basePost,
          markdown: '# My great post!\nThis is a *really exciting* post.',
        }
      }
    })

    await nextTick()

    expect(
      wrapper.find<HTMLDivElement>('#content').element!.innerHTML
    ).toEqual(
      '<h1 id="my-great-post">My great post!</h1>\n<p>This is a <em>really exciting</em> post.</p>\n'
    )
  })

  it('updates the preview when markdown is updated', async () => {
    const wrapper = mount(PostWriter, {
      props: {
        post: {
          ...basePost,
          markdown: '# My great post!\nThis is a *really exciting* post.',
        }
      }
    })

    await nextTick()
    wrapper.find<HTMLDivElement>('#markdown').element!.innerText = '## My new post'
    await wrapper.find('#markdown').trigger('input')

    expect(
      wrapper.find<HTMLDivElement>('#content').element!.innerHTML
    ).toEqual(
      '<h2 id="my-new-post">My new post</h2>\n'
    )
  })
})
