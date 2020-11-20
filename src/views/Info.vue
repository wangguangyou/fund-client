<template>
  <vs-alert class="my-alert" shadow :hidden-content.sync="hidden">
    <template #title>
      <div class="info" v-show="info">
        <span>上证指数</span>
        <span>{{info&&info[3]}}</span>
        <span>{{info&&info[31]}}</span>
        <span>{{info&&`${info[32]}%`}}</span>
      </div>

    </template>
    <LineChart :cData="cData" v-if="!hidden"></LineChart>
  </vs-alert>
</template>

<script>
  import LineChart from './Chart'
  export default {
    name: 'Info',
    components: { LineChart },
    props: ['info', 'cData'],
    data() {
      return {
        hidden: true
      }
    },
    mounted() { },
    methods: {},
    computed: {},
    watch: {}
  }
</script>

<style lang="less" scoped>
  .info {
    span {
      display: inline-block;
      margin-left: 1em;
    }
  }
  .my-alert {
    /deep/.vs-alert__content {
      height: 330px !important;
    }
    /deep/.vs-alert__content__text {
      padding: 0 !important;
    }
  }
</style>