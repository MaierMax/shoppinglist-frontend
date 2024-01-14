import { shallowMount } from '@vue/test-utils'
import ListContent from '@/components/ListContent.vue'
const fetch = require('node-fetch');

describe('ListContent.vue', () => {
  it('renders correctly with title and listID', () => {
    const wrapper = shallowMount(ListContent, {
      props: {
        title: 'Sample List',
        listID: 1
      }
    })
    expect(wrapper.text()).toContain('Sample List')
    expect(wrapper.vm.listID).toBe(1)
  })
})
