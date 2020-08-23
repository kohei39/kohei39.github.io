export const state = () => ({
  list: [],
  total: 0
})

export const mutations = {
  setList(state, list) {
    state.list = list
  },
  setTotal(state, total) {
    state.total = total
  }
}

export const getters = {
  list(state) {
    return state.list
  },
  total(state) {
    return state.total
  }
}

export const actions = {
  async getRestaurantList({ commit }, opts) {
    let param = ''
    let i = 0
    for (const key in opts) {
      if (i === 0) {
        param += `?${key}=${opts[key]}`
      } else {
        param += `&${key}=${opts[key]}`
      }
      i++
    }
    const res = await this.$axios.$get(`http://localhost:3000/api/gourmet/v1/${param}`)
    commit('setList', res.results.shop)
    commit('setTotal', res.results.results_available)
  }
}
