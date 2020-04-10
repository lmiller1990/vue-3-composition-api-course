import flushPromises from 'flush-promises'
import { mount } from '@vue/test-utils'

import Home from './Home.vue'
import { basePost } from './factories'

jest.mock('../utils', () => ({
  delay: () => {}
}))

jest.mock('axios', () => ({
  get: () => ({
    data: {
      posts: [basePost]
    }
  })
}))

describe('Timeline', () => {
  it('changes the tab when filtered', async () => {
    const wrapper = mount(Home)
    await flushPromises()

    const $today = wrapper.find('[data-test="today"]')
    expect($today.classes()).toContain('is-active')

    const $thisWeek = wrapper.find('[data-test="this week"]')
    await $thisWeek.trigger('click')

    expect($today.classes()).not.toContain('is-active')
    expect($thisWeek.classes()).toContain('is-active')
  })
})
