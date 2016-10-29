<template>
  <div class="home-wrap">
    <div class="container">
      <div class="banner">
        <img :src="banner" alt="quick start">
      </div>
      <p>简单 快速 高效</p>
    </div>
  </div>
</template>

<script type="text/babel">
  export default {
    data () {
      return {
        banner: require('../../assets/images/banner.png')
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../assets/less/varibles.less";
  .banner {
    width: 389px;
    margin-left: auto;
    margin-right: auto;
    padding-top: 60px;
    color: @color-default;
    img {
      width: 100%;
    }
  }

  p {
    font-size: 36px;
    text-align: center;
  }

</style>