// import Vue from 'vue'
import Home from './home.vue'

describe('HomeComponent', () => {
  it('setup是不是一个函数', () => {
    expect(Home.setup).toBe('function')
  })
})
