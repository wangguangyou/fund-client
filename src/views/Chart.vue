<template>
  <div style="height:300px" id="line-container">
  </div>
</template>

<script>
  import { Chart } from '@antv/g2';
  export default {
    name: '',
    components: {},
    props: ['cData', 'prec'],
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
        const chart = new Chart({
          container: 'line-container',
          autoFit: true,
          height: 250,
          padding: [20, 50, 20, 80]
        });
        chart.data(this.cData);

        chart.tooltip({
          showCrosshairs: true,
          shared: true,
        });
        chart.scale(
          {
            value: {
              alias: '净值'
            }
          }
        );
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