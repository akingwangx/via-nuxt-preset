<template>
  <div class="flex-1 ml-20 flex float-left h-full items-center">
    <div
      v-for="(item, index) in mainNavMenuItems"
      :key="index"
      :index="item.index||item.link"
      class="flex items-center mr-12 h-full nav"
      :class="{'nav-active': $route.path === item.link}">
      <nuxt-link
        :to="item.link"
        class="flex items-center h-full font-semibold">
        {{ item.title }}
      </nuxt-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HeaderMenu',
  computed: {
    mainNavMenuItems() {
      const list = [
        {
          index: '/',
          link: '/',
          title: '首页',
        },
        {
          index: '/other',
          link: '/other',
          title: '其他',
        },
      ];
      return list;
    },
  },
};
</script>
<style lang="scss">
.nav {
  border-bottom: 2px solid transparent;
  cursor: pointer;
  a {
    color: #000;
  }
  &:hover {
    a {
      @apply text-green-500;
    }
  }
}
.nav-active {
  a {
    @apply text-green-500;
  }
  border-bottom: 2px solid #05cdcd;
}
</style>
