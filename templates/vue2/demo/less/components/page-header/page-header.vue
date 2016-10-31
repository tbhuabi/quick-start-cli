<template>
  <div class="header-wrap">
    <header class="container">
      <div class="pull-left brand">Quick start</div>
      <div class="pull-right link">
        <a href="https://github.com/18616392776/quick-start-cli">Github</a>
      </div>
    </header>
  </div>
</template>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../assets/less/varibles.less";

  .header-wrap {
    background-color: @color-default;
    height: 100%;
    padding-top: 5px;
    box-sizing: border-box;
  }

  .brand {
    color: #fff;
    font-size: 36px;

  }

  .link {
    padding-top: 12px;
    a {
      text-decoration: none;
      padding: 5px 10px;
      background-color: @color-primary;
      border-radius: 3px;
      color: #fff;
      transition: background-color .3s;
      &:hover {
        background-color: @color-primary - 50;
      }
    }
  }

</style>