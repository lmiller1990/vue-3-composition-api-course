import { mount } from '@lmiller1990/vue-test-utils-next'

import Timeline from './Timeline.vue'

describe('Timeline', () => {
  it('changes the tab when filtered', async () => {
    const wrapper = mount(Timeline)
    const $today = wrapper.find('[data-test="today"]')
    expect($today.classes()).toContain('is-active')

    const $thisWeek = wrapper.find('[data-test="this week"]')
    await $thisWeek.trigger('click')

    expect($today.classes()).not.toContain('is-active')
    expect($thisWeek.classes()).toContain('is-active')
  })
})
