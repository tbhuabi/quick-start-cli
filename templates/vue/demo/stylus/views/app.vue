<template>
  <div class="page-wrap">
    <div class="page">
      <div class="header">
        <PageHeader></PageHeader>
      </div>
      <div class="page-content">
        <router-view></router-view>
      </div>
    </div>
    <div class="footer">
      <PageFooter></PageFooter>
    </div>
  </div>
</template>

<script>
  import PageHeaderComponent from '../components/page-header/page-header'
  import PageFooterComponent from '../components/page-footer/page-footer'
  export default {
    components: {
      PageHeader: PageHeaderComponent,
      PageFooter: PageFooterComponent
    }
  }
</script>
