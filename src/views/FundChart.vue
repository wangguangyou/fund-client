<template>
  <div style="height:300px" id="fund-container">
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
      return {}
    },
    mounted() {
      this.$nextTick(_ => {
        this.tr && this.init()
      })
    },
    methods: {
    async  init() {
        console.log('init')
        let data = []
        let DWJZ = 0
        let res = await getFundVarietieValuationDetail(this.tr.fundcode)
        if(res&&res.text){
          try {
           let json =  JSON.parse(res.text)
           data =  json.Datas.map(item=>item.split(','))
            DWJZ = +json.Expansion.DWJZ;
            console.log(DWJZ)
          } catch (error) {
            
          }
        }
         console.log(data)
        // if (this.chart) {
        //   this.chart.changeData(this.cData)
        //   return
        // }
        const chart = new Chart({
          container: 'fund-container',
          autoFit: true,
          height: 250,
          padding: [20, 60,50, 80]
        });
        data = data.map(item=>{
          return {
            date:item[1],
            rate:+item[2],
            value:+item[2],
            // value:(DWJZ * (1 + 0.01 * (+item[2]))).toFixed(4)
          }
        })
        console.log(data)
        chart.data(data);
        chart.scale(
          {
            date: {
              type:'cat'
            },
            rate:{
              formatter:(v)=>(+v).toFixed(2)+'%',
              alias:'涨幅',
            },
            value:{
              alias:'净值',
              formatter:(v)=>(DWJZ * (1 + 0.01 * (v))).toFixed(4)
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
          .point()
          .position('date*rate')
        //   // .color('name')
          .shape('smooth');

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