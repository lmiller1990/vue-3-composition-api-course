import { mount } from '@lmiller1990/vue-test-utils-next'

import { basePost } from './factories'
import TimelineItem from './TimelineItem.vue'

describe('TimelineItem', () => {
  it('emits a like event when clicking the like button', async () => {
    const wrapper = mount(TimelineItem, {
      props: {
        post: basePost
      }
    })

    await wrapper.find('[data-test="likes"]').trigger('click')
  
    expect(wrapper.emitted().like).toHaveLength(1)
    expect(wrapper.emitted().like[0]).toEqual([basePost.id])
  })
})
