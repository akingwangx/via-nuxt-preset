<template>
  <div class="c-header bg-white px-20 z-10">
    <el-header class="m-auto max-w-1200 flex items-center px-0">
      <nuxt-link
        to="/"
        class="flex">
        <img class="logo" src="/images/logo.png">
      </nuxt-link>

      <div class="flex-1"></div>

      <!-- <HeaderMenu></HeaderMenu> -->

      <div class="w-1 h-20 bg-gray-100">
      </div>

      <LangSelect class="ml-35" />
    </el-header>
  </div>
</template>

<script>
import LangSelect from '~/components/LangSelect.vue';

export default {
  components: {
    LangSelect,
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
