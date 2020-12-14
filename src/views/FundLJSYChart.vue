<template>
  <div style="position:relative">
    <div style="height:300px" id="fund-ljsy-container">
    </div>
    <div class="center">
      <vs-radio v-for="(item) in options" v-model="picked" :val="item.value">
        {{item.label}}
      </vs-radio>
    </div>
  </div>
</template>

<script>
  import { getFundYjzs } from '@/api/main'
  import { Chart } from '@antv/g2';
  export default {
    name: 'FundLJSYChart',
    components: {},
    props: ['tr'],
    data() {
      return {
        currentDwjz: null,
        chart: null,
        picked: 'y',
        options: [{ label: '近1月', value: 'y' }, { label: '近3月', value: '3y' }, { label: '近6月', value: '6y' }, { label: '近1年', value: 'n' }, { label: '近3年', value: '3n' }]
      }
    },
    mounted() { this.init() },
    methods: {
      async getData() {
        let data = []
        let res = await getFundYjzs(this.tr.fundcode, this.picked)

        if (res && res.text) {
          try {
            let json = JSON.parse(res.text)
            data = json.Datas;
            console.log(data)

            // data = json.Datas.map(item => item.split(','))
          } catch (error) {
            console.log(error)
          }
        }
        return data.map(item => {
          return {
            FSRQ: item.FSRQ,
            DWJZ: +item.DWJZ
          }
        })
      },
      async init() {
        let data = await this.getData()
        this.currentDwjz = data[0].DWJZ
        console.log(data)
        if (this.chart) {

          return this.chart.changeData(data)
        }
        const chart = this.chart = new Chart({
          container: 'fund-ljsy-container',
          autoFit: true,
          height: 250,
          padding: [20, 60, 80, 80]
        });

        chart.data(data);
        chart.scale(
          {
            FSRQ: {
              type: 'cat'
            },
            DWJZ: {
              formatter: (v) => ((v - this.currentDwjz) / this.currentDwjz * 100).toFixed(2) + '%',
              alias: '涨幅',
            },
            // value: {
            //   alias: '净值',
            //   formatter: (v) => (DWJZ * (1 + 0.01 * (v))).toFixed(4)
            // }
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

        // chart
        //   .line()
        //   .position('FSRQ*value')
        //   .shape('smooth');
        chart
          .line()
          .position('FSRQ*DWJZ')
          .shape('smooth');

        chart.render();
        // const timeOutId = window.setTimeout(async _ => {
        //   this.init()
        // }, 10000)
        // this.$once('hook:beforeDestory', () => {
        //   window.clearTimeout(timeOutId)
        // })
      }
    },
    computed: {},
    watch: {
      picked(val) {
        this.init()
      }
    }
  }
</script>


<style lang="less" scoped>
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    margin-top: 15px;
    height: 35px;
  }
</style>