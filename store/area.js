export const state = () => ({
  smallAreaList: [],
  middleAreaList: [],
  largeAreaList: []
})

export const mutations = {
  setSmallAreaList(state, smallAreaList) {
    state.smallAreaList = smallAreaList
  },
  setMiddleAreaList(state, middleAreaList) {
    state.middleAreaList = middleAreaList
  },
  setLargeAreaList(state, largeAreaList) {
    state.largeAreaList = largeAreaList
  }
}

export const getters = {
  smallAreaList(state) {
    return state.smallAreaList
  },
  middleAreaList(state) {
    return state.middleAreaList
  },
  largeAreaList(state) {
    return state.largeAreaList
  }
}

export const actions = {
  async getSmallAreaList({ commit }, opts) {
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
    const res = await this.$axios.$get(`http://localhost:3000/api/small_area/v1/${param}`)
    commit('setSmallAreaList', res.results.small_area)
  },
  async getMiddleAreaList({ commit }, opts) {
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
    const res = await this.$axios.$get(`http://localhost:3000/api/middle_area/v1/${param}`)
    commit('setMiddleAreaList', res.results.middle_area)
  },
  async getLargeAreaList({ commit }, opts) {
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
    const res = await this.$axios.$get(`http://localhost:3000/api/large_area/v1/${param}`)
    commit('setLargeAreaList', res.results.large_area)
  }
}
