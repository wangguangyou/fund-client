<template>
  <div class="vs-select__options__content" style="max-height: calc(100vh - 180px)">
    <vs-table ref="table" striped>
      <template #thead>
        <vs-tr>
          <vs-th>
            名称
          </vs-th>
          <vs-th>
            代码
          </vs-th>
          <vs-th>
            净值
          </vs-th>
          <vs-th>
            更新时间
          </vs-th>
          <vs-th>
            操作
          </vs-th>
        </vs-tr>
      </template>
      <template #tbody>
        <vs-tr :key="i" v-for="(tr, i) in  $vs.getPage(tableData, page, max) " :data="tr">

          <vs-td>
            {{ tr.name }}
          </vs-td>
          <vs-td>
            {{ tr.fundcode }}
          </vs-td>
          <vs-td>
            <span :class="`${tr.gszzl>0?'nomatch':'match'}`">{{ tr.gszzl }}</span>
          </vs-td>
          <vs-td>
            {{ tr.gztime }}
          </vs-td>
          <vs-td>
            <vs-button @click="deleteFund(tr)" gradient style="min-width: 60px" danger animation-type="scale">
              <i class='bx bx-trash'></i>
              <template #animate>
                删除
              </template>
            </vs-button>
          </vs-td>
          <template #expand>
            <div class="con-content">
              <div>
                <span class="label">近一年收益率</span>
                <span :class="`${tr.details.syl_1n>0?'nomatch':'match'}`">{{tr.details.syl_1n}}%</span>
              </div>
              <div>
                <span class="label">近六个月收益率</span>
                <span :class="`${tr.details.syl_6y>0?'nomatch':'match'}`">{{tr.details.syl_6y}}%</span>
              </div>
              <div>
                <span class="label">近三个月收益率</span>
                <span :class="`${tr.details.syl_3y>0?'nomatch':'match'}`">{{tr.details.syl_3y}}%</span>
              </div>
              <div>
                <span class="label">近一个月收益率</span>
                <span :class="`${tr.details.syl_1y>0?'nomatch':'match'}`">{{tr.details.syl_1y}}%</span>
              </div>

            </div>
          </template>
        </vs-tr>
      </template>
      <template #notFound>
        请添加基金
      </template>
      <template #footer>
        <vs-pagination v-model="page" :length="$vs.getLength(tableData, max)" />
      </template>
    </vs-table>
  </div>
</template>

<script>
  import { getFundView, getFundDetails } from '@/api/main'
  export default {
    name: 'TheTable',
    components: {},
    props: [],
    data() {
      return {
        page: 1,
        max: 5,
        tableData: []
      }
    },
    mounted() { },
    methods: {
      deleteFund(item) {
        this.$store.commit('setFundList', Object({ CODE: item.fundcode }, item))

      },
      async getFundView() {
        const loading = this.$vs.loading({
          target: this.$el && this.$el.querySelector('tbody'),
          color: 'primary'
        })
        let ress = []
        try {
          ress = await Promise.all(this.fundList.map(item => getFundView(item.CODE)))
        } catch (error) {
          console.log(error)
        }
        console.log(ress)
        loading && loading.close()
        function jsonpgz(item) {
          console.log(item)
          return item
        }

        this.tableData = ress.map(item => {
          // "jsonpgz({"fundcode":"161024","name":"富国中证军工指数分级","jzrq":"2020-11-16","dwjz":"1.0500","gsz":"1.0287","gszzl":"-2.03","gztime":"2020-11-17 15:00"});"
          return eval(item.body.toString())
        }).filter(Boolean);
        let that = this;
        (async function () {
          let ress = await Promise.all(that.tableData.map(item => getFundDetails(item.fundcode)))
          ress.forEach((res, index) => {
            // /*近一年收益率*/var syl_1n="89.9";/*近6月收益率*/var syl_6y="50.6";/*近三月收益率*/var syl_3y="3.91";/*近一月收益率*/var syl_1y="0.62";
            let s = res.body.toString()
            s += `return {fS_code,syl_1n,syl_6y,syl_3y,syl_1y}`
            const sum = new Function('_', s);
            const result = sum()
            that.$set(that.tableData[index], 'details', result)
            console.log(result)
          })
        })()

      }
    },
    computed: {
      fundList() {
        return this.$store.getters.getFundList || []
      }
    },
    watch: {
      tableData: {
        handler(val) {
          let len = val.length
          let t = Math.ceil(len / this.max)
          if (this.page >= t) {
            this.page = Math.max(t, 1)
          }
        }, deep: true
      },
      fundList: {
        handler(val) {
          this.getFundView()
        }, deep: true, immediate: true
      }
    }
  }
</script>

<style lang="less" scoped>
  .con-content {
    font-size: 12px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .label {
      display: inline-block;
      margin-right: 1em;
    }
  }
</style>