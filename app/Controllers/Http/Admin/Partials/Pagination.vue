<template>
  <div class="pagination">
    <div class="first" :class="{'hidden' : meta.current_page === 1}">
      <a class="font-large" @click.prevent="switched(0)" v-show="meta.current_page > 0">&laquo;&nbsp;หน้าแรก</a>
    </div>

    <div class="pages">

      <div class="arrow" :class="{'disabled' : meta.current_page === 1}">
        <a v-show="meta.current_page > 1" @click.prevent="switched(meta.current_page - 1)">
          <i class="fas fa-caret-left"></i>
        </a>
      </div>

      <div class="page" v-for="page in meta.last_page" :class="{'active' : meta.current_page == page}" v-show="Math.abs(page - meta.current_page) < 3">
        <a @click.prevent="switched(page)">
          <span>{{ page }}</span>
        </a>
      </div>

      <div class="arrow" :class="{'disabled' : meta.current_page === meta.last_page}">
        <a v-show="meta.current_page < meta.last_page" @click.prevent="switched(meta.current_page + 1)">
          <i class="fas fa-caret-right"></i>
        </a>
      </div>

    </div>

    <div class="last" :class="{'hidden' : meta.current_page === meta.last_page}">
      <a class="font-large" v-show="meta.current_page < meta.last_page" @click.prevent="switched(meta.last_page)">หน้าสุดท้าย&nbsp;&raquo;</a>
    </div>

  </div>
</template>

<script>
export default {
  props: [
    'meta'
  ],
  methods: {
    switched(page) {
      if (this.pageIsOutOfBounds(page)) {
        return alert('out of bound');
      }
      if (page !== this.meta.current_page) {
        this.$emit('switched', page)
      }
    },

    pageIsOutOfBounds(page) {
      return page < 0 || page > this.meta.last_page
    }
  }
}
</script>
