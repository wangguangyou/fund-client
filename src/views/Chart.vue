<template>
  <div style="height:300px" id="line-container">
  </div>
</template>

<script>
  import { Chart } from '@antv/g2';
  export default {
    name: '',
    components: {},
    props: ['cData'],
    data() {
      return {}
    },
    mounted() {
      this.$nextTick(_ => {
        this.cData && this.init()
      })
    },
    methods: {
      init() {
        console.log('init')
        // if (this.chart) {
        //   this.chart.changeData(this.cData)
        //   return
        // }
        const chart = new Chart({
          container: 'line-container',
          autoFit: true,
          height: 250,
          padding: [20, 20, 20, 80]
        });
        chart.data(this.cData);

        chart.tooltip({
          showCrosshairs: true,
          shared: true,
        });

        // chart.axis('date', {
        //   label: {
        //     formatter: (val) => {
        //       console.log(1111)
        //       return this.$Date.format(val)
        //     },
        //   },
        // });

        chart
          .line()
          .position('date*value')
          .shape('smooth');

        // chart
        //   .point()
        //   .position('date*rate')
        //   .color('name')
        //   .shape('circle');

        chart.render();
      },
    },
    computed: {},
    watch: {
      cData(val) {
        this.$nextTick(_ => {
          val && this.init()
        })
      }
    }
  }
</script>

<style lang="less" scoped>
</style>