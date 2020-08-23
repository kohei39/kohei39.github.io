<template>
<div>
  <!-- <Header></Header> -->
  <!-- Page Content -->
  <div class="container">

    <!-- Jumbotron Header -->
    <header class="jumbotron my-4">
      <h2 class="display-3">A Warm Welcome!</h2>
      <p class="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa, ipsam, eligendi, in quo sunt possimus non incidunt odit vero aliquid similique quaerat nam nobis illo aspernatur vitae fugiat numquam repellat.</p>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <input type="text" id="free_word" class="form-control mr-sm-2" v-model="keyword" placeholder="フリーワード" aria-label="フリーワード">

        <div class="collapse navbar-collapse" id="Navber">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item dropdown">
              <select class="nav-link dropdown-toggle" id="navbarDropdown1" v-model="largeAreaCd">
                <option value="">大エリア</option>
                <option v-for="largeArea in largeAreaList" :key="largeArea.code" :value="largeArea.code">{{ largeArea.name }}</option>
              </select>
            </li>
            <li class="nav-item dropdown">
              <select class="nav-link dropdown-toggle" id="navbarDropdown2" v-model="middleAreaCd">
                <option value="">中エリア</option>
                <option v-for="middleArea in middleAreaList" :key="middleArea.code" :value="middleArea.code">{{ middleArea.name }}</option>
              </select>
            </li>
            <li class="nav-item dropdown">
              <select class="nav-link dropdown-toggle" id="navbarDropdown3" v-model="smallAreaCd">
                <option value="">小エリア</option>
                <option v-for="smallArea in smallAreaList" :key="smallArea.code" :value="smallArea.code">{{ smallArea.name }}</option>
              </select>
            </li>
          </ul>
          <div class="form-inline my-2 my-lg-0">
            <button type="submit" class="btn btn-outline-success my-2 my-sm-0" @click="search">検索</button>
          </div>
        </div><!-- /.navbar-collapse -->
      </nav>
    </header>

    <!-- Page Features -->
    <div class="row text-center">

      <div class="col-lg-4 col-md-6 mb-4" v-for="restaurant in list" :key="restaurant.id">
        <div class="card h-100">
          <img class="card-img-top" :src="restaurant.logo_image" alt="">
          <div class="card-body">
            <h4 class="card-title">{{ restaurant.name }}</h4>
            <p class="card-text">{{ restaurant.catch }}</p>
          </div>
          <div class="card-footer">
            <a href="#" class="btn btn-primary" @click="openRestaurantInfo(restaurant.id)">Find Out More!</a>
          </div>
        </div>
      </div>

    </div>
    <!-- /.row -->

  </div>
  <!-- /.container -->
  <Pagination :rows="total" @updated="execCurrentPage" />
  <restaurantInfo></restaurantInfo>
</div>

</template>

<script>
// import Header from '~/components/header'
import { mapGetters } from 'vuex'
import cloneDeep from '~/functions/cloneDeep'
import Pagination from '~/components/pagination'
import restaurantInfo from '~/components/modal/restaurantInfo'

export default {
  name: 'Restaurant',
  components: {
    // Header,
    Pagination,
    restaurantInfo
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App (restaurant)',
      hotApiKey: 'ec6c51669c0592f9',
      keyword: '',
      largeAreaList: [],
      middleAreaList: [],
      smallAreaList: [],
      largeAreaCd: '',
      middleAreaCd: '',
      smallAreaCd: '',
      restaurantList: [],
      currentPage: 1
    }
  },
  watch: {
    largeAreaCd () {
      if (this.largeAreaCd) {
        this.getMiddleAreaList()
      }
    },
    middleAreaCd () {
      if (this.middleAreaCd) {
        this.getSmallAreaList()
      }
    }
  },
  mounted () {
    this.largeAreaCd = 'Z011'
    this.search()
    this.getLargeAreaList()
  },
  computed: {
    startNumber () {
      const num = 1 + (this.currentPage - 1) * this.perPages
      console.log(num)
      return num
    },
    perPages () {
      return 20
    },
    initialParam () {
      return {
        key: this.hotApiKey,
        format: 'json'
      }
    },
    smallAreaApiParam () {
      const param = cloneDeep(this.initialParam)
      Object.assign(param, {
        middle_area: this.middleAreaCd
      })
      console.log(param)
      return param
    },
    middleAreaApiParam () {
      const param = cloneDeep(this.initialParam)
      Object.assign(param, {
        large_area: this.largeAreaCd
      })
      console.log(param)
      return param
    },
    apiParam () {
      const param = cloneDeep(this.initialParam)
      Object.assign(param, {
        large_area: this.largeAreaCd,
        middle_area: this.middleAreaCd,
        small_area: this.smallAreaCd,
        keyword: this.keyword,
        count: this.perPages,
        start: this.startNumber
      })
      console.log(param)
      return param
    },
    ...mapGetters({ list: 'restaurant/list', total: 'restaurant/total', largeAreas: 'area/largeAreaList', middleAreas: 'area/middleAreaList', smallAreas: 'area/smallAreaList' })
  },
  methods: {
    searchQuery (param, value) {
      let query = ''
      if (value) {
        query = `&${param}=${value}`
      }
      return query
    },
    async search () {
      const result = await this.$store.dispatch('restaurant/getRestaurantList', this.apiParam)
      this.restaurantList = cloneDeep(this.list)
    },
    execCurrentPage (value) {
      this.currentPage = value
      this.search()
      console.log(value)
    },
    async getSmallAreaList () {
      const result = await this.$store.dispatch('area/getSmallAreaList', this.smallAreaApiParam)
      this.smallAreaList = cloneDeep(this.smallAreas)
    },
    async getMiddleAreaList () {
      const result = await this.$store.dispatch('area/getMiddleAreaList', this.middleAreaApiParam)
      this.middleAreaList = cloneDeep(this.middleAreas)
    },
    async getLargeAreaList () {
      const result = await this.$store.dispatch('area/getLargeAreaList', this.initialParam)
      this.largeAreaList = cloneDeep(this.largeAreas)
    },
    openRestaurantInfo(id) {
      const restaurant = this.restaurantList.find((restaurant) => {
        return restaurant.id === id
      })
      this.$modal.show('restaurant-info', restaurant)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#free_word {
  width: 30%;
}
select.nav-link {
  height: 2.5rem;
  border: none;
}
</style>
