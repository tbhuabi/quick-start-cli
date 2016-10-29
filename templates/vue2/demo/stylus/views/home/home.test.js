// import Vue from 'vue'
import Home from './home.vue'

describe('HomeComponent', () => {
  it('data是不是一个函数', () => {
    expect(typeof Home.data).toBe('function')
  })
})
