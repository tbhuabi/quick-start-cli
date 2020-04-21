<template>
  <div class="home-wrap">
    <div class="container">
      <div class="banner">
        <img :src="banner" alt="quick start">
      </div>
      <p>简单{{ mark }}快速{{ mark }}高效</p>
    </div>
  </div>
</template>

<script type="text/babel">
  import { ref } from 'vue'

  export default {
    setup() {
      const mark = ref('-')
      setInterval(() => {
        mark.value = mark.value === '-' ? ' ' : '-'
      }, 400)
      return {
        banner: require('../../assets/images/banner.png'),
        mark
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../assets/stylus/varibles.styl";
  .banner {
    width: 389px;
    margin-left: auto;
    margin-right: auto;
    padding-top: 60px;
    color: $color-default;
    img {
      width: 100%;
    }
  }

  p {
    font-size: 36px;
    text-align: center;
  }

</style>
