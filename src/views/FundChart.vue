<template>
  <div style="height:350px" id="fund-container">
  </div>
</template>

<script>
  import { Chart } from '@antv/g2';
  import { getFundVarietieValuationDetail } from '@/api/main'
  export default {
    name: '',
    components: {},
    props: ['tr'],
    data() {
      return {
        chart: null
      }
    },
    mounted() {
      this.$nextTick(_ => {
        this.tr && this.init()
      })
    },
    methods: {
      async getData() {
        let data = []
        let DWJZ = 0
        let res = await getFundVarietieValuationDetail(this.tr.fundcode)

        if (res && res.text) {
          try {
            let json = JSON.parse(res.text)
            data = json.Datas.map(item => item.split(','))
            DWJZ = +json.Expansion.DWJZ;
          } catch (error) {

          }
        }
        return {
          data: data.map(item => {
            return {
              date: item[1],
              rate: +item[2],
              value: +item[2],
            }
          }), DWJZ
        }
      },
      async init() {
        let { data, DWJZ } = await this.getData()
        if (this.chart) {
          return this.chart.changeData(data)
        }
        const chart = this.chart = new Chart({
          container: 'fund-container',
          autoFit: true,
          height: 300,
          padding: [20, 60, 50, 80]
        });

        chart.data(data);
        chart.scale(
          {
            date: {
              type: 'cat'
            },
            rate: {
              formatter: (v) => (+v).toFixed(2) + '%',
              alias: '涨幅',
            },
            value: {
              alias: '净值',
              formatter: (v) => (DWJZ * (1 + 0.01 * (v))).toFixed(4)
            }
          },
          // {
          //   nice: true,
          // }
        );
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
        chart
          .line()
          .position('date*rate')
          .shape('smooth');

        chart.render();
        const timeOutId = window.setTimeout(async _ => {
          this.init()
        }, 10000)
        this.$once('hook:beforeDestory', () => {
          window.clearTimeout(timeOutId)
        })
      },
    },
  }
</script>

<style lang="less" scoped>
</style>