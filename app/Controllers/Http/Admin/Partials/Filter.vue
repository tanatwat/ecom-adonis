<template>
<div>
  <div>
    <button class="btn primary" @click.prevent="formVisible = !formVisible">ตัวกรอง&nbsp;<i class="fas fa-filter"></i></button>
    <button v-show="canToggleView" class="btn-icon float-right fas fa-th-list" :class="{'active' : view == 'list'}" @click="$emit('changeView', 'list'), view = 'list'"></button>
    <button v-show="canToggleView" class="btn-icon float-right fas fa-th-large" :class="{'active' : view == 'grid'}" @click="$emit('changeView', 'grid'), view = 'grid'"></button>
  </div>
  <transition name="fade">
    <div v-show="formVisible" class="filter margin-15-top">
      <div class="grid-x">
        <div class="small-12 medium-4">
          <label class="lead">ชื่อสินค้า</label>
          <input class="full-width" type="text" v-model="name">
        </div>
        <div class="small-12 medium-3 margin-10-h-screen">
          <label class="lead">เรียงตาม</label>
          <select class="select-input full-width" v-model="orderBy">
            <option value="min">ราคาต่ำสุดก่อน</option>
            <option value="max">ราคาสูงสุดก่อน</option>
          </select>
        </div>
      </div>


      <div class="grid-y">
        <label class="lead">หมวดหมู่</label>
        <div class="category">
          <li v-for="category in categories" @click.prevent="selectCategory(category)" :class="{'active': category.id == selected.c }">{{ category.name }}</li>
        </div>
        <div class="category" v-show="selected.c && subcategories.length">
          <li v-for="subcategory in subcategories" @click.prevent="selectSubcategory(subcategory)" :class="{'active': subcategory.id == selected.sub }">{{ subcategory.name }}</font></li>
        </div>
      </div>
      <label class="lead">ราคา</label>
      <div class="grid-x">

        <div class="small-5 medium-3">
          <input class="" type="number" min="0" max="9999999" v-model="min" autocomplete="off" placeholder="ต่ำสุด">
        </div>
        <div class="small-5 medium-3 margin-10-h">
          <input class="" type="number" min="0" max="9999999" v-model="max" autocomplete="off" placeholder="สูงสุด">
        </div>

      </div>
      <div class="flex padding-10-v" v-show="includeDiscount">
        <label class="lead checkbox" :class="{'active' : selected.discount}">เฉพาะสินค้าลดราคา&nbsp;<input class="" type="checkbox" name="discount" v-model="selected.discount"></label>
      </div>

      <transition name="fade">
      <div class="breadcrumb" v-show="activated">
          <p class="no-margin lead">คุณกำลังค้นหา</p>
          <span v-show="name"><strong>ชื่อสินค้า</strong>&nbsp;{{ name }}</span>
          <div v-show="selected.c">
            <strong>หมวดหมู่</strong>
            <span>{{ breadcrumb.category }}</span>
            <span>{{ breadcrumb.subcategory }}</span>
          </div>
          <span v-show="orderBy">{{ orderBy == 'min' ? 'ราคาต่ำสุดก่อน' : 'ราคาสูงสุดก่อน' }}</span>
          <span v-show="min">ราคาต่ำสุด&nbsp;{{ $number.currency(min) }}&nbsp;</span>
          <span v-show="max">ราคาสูงสุด&nbsp;{{ $number.currency(max) }}</span>
          <span class="font-green" v-show="selected.discount">สินค้าลดราคาเท่านั้น</span>
      </div>
      </transition>
      <div class="grid-x align-right btn-group">
        <button class="btn primary medium-2 small-12" @click.prevent="clearFilter()">ล้างการค้นหา</button>
        <button class="btn success medium-2 small-12" @click="applyFilter()">ค้นหา</button>
      </div>
    </div>
  </transition>
</div>
</template>

<script>
export default {
    data() {
      return {
        categories : [],
        subcategories: [],
        products : [],
        name : null,
        orderBy : null,
        min : null,
        max : null,
        formVisible: false,
        breadcrumb: {},
        selected: {
          discount: false
        },
        view: 'grid'
      }
    },
    props: ['canToggleView', 'includeDiscount'],
    computed: {
      activated() {
        if (this.selected.c || this.min || this.max || this.selected.discount || this.name || this.orderBy) {
          return true
        } else {
          return false
        }
      }
    },
    methods: {
      getCategory() {
        this.$root.loading = true
        this.$Progress.start()
        httpget(this.$root.url + '/api/get/category').then(response => {
          this.categories = response.data
          this.$root.loading = false
          this.$Progress.finish()
        })
      },
      applyFilter() {
        this.$emit('search', {
          category: this.selected.c,
          subcategory: this.selected.sub,
          discount: this.selected.discount,
          min: this.min,
          max: this.max,
          name: this.name,
          order: this.orderBy,
        })
      },
      clearFilter() {
        this.name = null
        this.orderBy = null
        this.min = null
        this.max = null
        this.selected.discount = false
        this.selected.c = null
        this.selected.sub = null
      },
      selectCategory(category) {
        this.subcategories = category.subcategory
        this.breadcrumb = Object.assign({}, this.breadcrumb, {
          category: category.name,
          subcategory: null
        })
        this.selected = Object.assign({}, this.selected, {
          c: category.id,
          sub: null
        })
      },
      selectSubcategory(subcategory) {
        this.types = subcategory.type,
        this.breadcrumb = Object.assign({}, this.breadcrumb, {
          subcategory: subcategory.name
        })
        this.selected = Object.assign({}, this.selected, {
          sub: subcategory.id
        })
      }
    },
    created() {
      this.getCategory()
    }
}
</script>
