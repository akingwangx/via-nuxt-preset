<template>
  <el-container
    class="l-default"
    direction="vertical">
    <Header />
    <el-main class="l-default-main">
      <nuxt />
    </el-main>
    <Footer />
  </el-container>
</template>

<script>
import Header from '~/components/header.vue';
import Footer from '~/components/footer.vue';

export default {
  name: 'LayoutsDefault',
  components: {
    Header,
    Footer,
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
