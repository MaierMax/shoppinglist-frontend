import { shallowMount } from '@vue/test-utils'
import HomeContent from '@/components/HomeContent.vue'

describe('HomeContent.vue', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(HomeContent, {
      props: {
        title: 'My Shopping Lists'
      }
    })
    expect(wrapper.text()).toContain('My Shopping Lists')
  })
})
