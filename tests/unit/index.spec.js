import { createRouter, createWebHistory } from 'vue-router'
import { mount } from '@vue/test-utils'
import App from '@/App.vue'
import router from '@/router/index.js'

describe('Router Navigation', () => {
  it('navigates to home view', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router]
      }
    })

    await router.push('/')
    await router.isReady()

    expect(wrapper.text()).toContain('My shopping Lists')
  })

  it('navigates to list view with params', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router]
      }
    })

    await router.push('/list/1/SampleList')
    await router.isReady()

    expect(wrapper.text()).toContain('SampleList')
  })
})
