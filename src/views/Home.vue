<template>
  <div class="container">
    <Info :cData="cData" :info="info"></Info>
    <div class="form">
      <vs-tooltip bottom shadow not-hover v-model="activeTooltip" :loading="tooltipLoading">
        <vs-input @input="onInput" @focus="onFocus" @blur="onBlur" @click-icon="onClickIcon" style="width:200px" shadow icon-after v-model="code" label-placeholder="请输入基金代码、名称">
          <template #icon>
            <!-- <i class='bx bx-reply'></i> -->
            <i class='bx bxl-telegram'></i>
          </template>
        </vs-input>
        <template #tooltip>
          <div style="min-width:200px">
            <div style="box-shadow:none;position:relative" class="vs-select__options vs-component--primary">
              <div class="vs-select__options__content">
                <button @mousedown.prevent.stop="" @click.prevent.stop="onSelected(item)" :key="item.CODE" v-for="item in Datas" :class="{'vs-select__option':true,activeOption:hasFund(item),isHover:false&&hasFund(item)}">
                  {{item.NAME}}({{item.CODE}})
                </button>
              </div>
            </div>
          </div>

        </template>
      </vs-tooltip>
      <div>
      </div>
      <div style="width:200px;text-align:right">
        <vs-button @click="re" color="#7d33ff" gradient style="display: inline-block;min-width: 40px" animation-type="scale">
          <i class='bx bx-revision'></i>
          <template #animate>
            刷新
          </template>
        </vs-button>
      </div>
    </div>
    <TheTable ref="TheTable"></TheTable>

  </div>
</template>

<script>
  import Info from './Info'
  import { searchFund, getSh } from '@/api/main'
  import TheTable from './TheTable'
  export default {
    name: 'Home',
    components: { Info, TheTable },
    props: [],
    data() {
      return {
        timeoutId: '',
        hidden: true,
        activeTooltip: false,
        tooltipLoading: false,
        code: '',
        Datas: [],
        cData: null,
        chart: null,
        info: null
      }
    },
    mounted() { this.getSh() },
    methods: {

      re() {
        this.getSh()
        this.$refs.TheTable.getFundView()
      },
      onInput() {
        this.onFocus()
      },
      onSelected(item) {
        console.log(item)
        this.code = ''
        this.$store.commit('setFundList', item)
      },
      async getSh() {
        window.clearTimeout(this.timeoutId)
        let sh = await getSh()
        sh = JSON.parse(sh.text)
        console.log(sh)
        sh = sh.data.sh000001
        this.info = sh.qt.sh000001
        console.log(this.info)
        this.cData = sh.day.map(item => ({ date: item[0], value: +item[2] }))

        this.timeoutId = window.setTimeout(_ => {
          this.getSh()
        }, 100000)
        this.$once('hook:beforeDestroy', function () {
          window.clearTimeout(this.timeoutId)
        })
      },
      async onFocus() {
        if (!this.code) return
        this.activeTooltip = true
        this.tooltipLoading = true
        let fund = await searchFund({ key: this.code })
        fund = JSON.parse(fund.text)
        this.tooltipLoading = false
        let { Datas } = fund
        this.Datas = Datas.filter(item => item.CATEGORY == 700)

      },
      onBlur() {
        this.activeTooltip = false
      },
      onClickIcon() {
        console.log(this.code)
      },
      hasFund(item) {
        let find = this.fundList.find(find => find.CODE == item.CODE)
        return find
      }
    },
    computed: {
      fundList() {
        return this.$store.getters.getFundList || []
      }
    },
    watch: {
    }
  }
</script>

<style lang="less" scoped>
  .container {
    padding: 10px;
  }
  .form {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 2%;
    margin-top: 5px;
  }
  .info {
    span {
      display: inline-block;
      margin-left: 1em;
    }
  }
</style>