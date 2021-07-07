<template>
  <el-container
    class="l-default"
    direction="vertical">
    <Header />
    <main class="l-default-main">
      <nuxt />
    </main>
  </el-container>
</template>

<script>
import Header from '~/components/header.vue';

export default {
  name: 'LayoutsDefault',
  components: {
    Header,
  },
  data() {
    return {};
  },
  head() {
    return {};
  },
};
</script>

<style lang="scss">
.l-default {
  width: 100%;
  background: #f4f4f9;
  min-height: 100%;
  min-height: 100vh;
}
</style>
