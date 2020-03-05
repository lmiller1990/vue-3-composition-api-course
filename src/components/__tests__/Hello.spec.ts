import { mount } from 'vue-test-utils-next'

import HelloWorld from '../HelloWorld.vue'

test('Testing', () => {
  const wrapper = mount(HelloWorld)

  console.log(wrapper.html())
})