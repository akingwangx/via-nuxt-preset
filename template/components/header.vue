<template>
  <div class="c-header bg-white px-20 z-10">
    <el-header class="m-auto max-w-1200 flex items-center px-0">
      <div class="w-1200 h-full flex items-center justify-start">
        <nuxt-link
          to="/"
          class="flex">
          <img
            class="logo"
            src="/images/logo.png">
        </nuxt-link>
        <ProductMenu class="ml-5" />
        <HeaderMenu />
        <LangSelect class="ml-35" />
      </div>
    </el-header>
  </div>
</template>

<script>
import LangSelect from '~/components/LangSelect.vue';
import ProductMenu from '~/components/productMenu.vue';
import HeaderMenu from '~/components/headerMenu.vue';

export default {
  components: {
    LangSelect,
    ProductMenu,
    HeaderMenu,
  },
  data() {
    return {};
  },
  computed: {},
  mounted() {},
};
</script>

<style lang="scss">
.c-header {
}
</style>
