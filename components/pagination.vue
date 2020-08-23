<template>
    <div class="mt-3">
        <b-pagination v-model="currentPage" :total-rows="rows" :limit="5" :per-page="20" size="lg" align="center" @input="current"></b-pagination>
    </div>
</template>

<script>
export default {
  data () {
    return {
      currentPage: 1
    }
  },
  props: {
    rows: {
      type: Number
    }
  },
  methods: {
    current () {
      console.log(this.currentPage)
      this.$emit('updated', this.currentPage)
    }
  }
}
</script>
