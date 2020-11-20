export default {
  state: {
    fundList: null
  },
  getters: {
    getFundList: (state) => {
      return state.fundList
    }
  },
  mutations: {
    setFundList(state, item) {
      let fundList = state.fundList || []
      let find = fundList.find(find => find.CODE == item.CODE)
      if (find) {
        state.fundList = state.fundList.filter(find => find.CODE != item.CODE)
      } else {
        state.fundList = [{
          CODE: item.CODE
        }].concat(state.fundList || [])
      }
    }
  },
  actions: {

  }
}