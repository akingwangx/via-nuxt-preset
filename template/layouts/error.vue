<template>
  <div class="p-error">
    <div class="p-error__wrap flex flex-col items-center justify-center">
      <template v-if="parseInt(error.statusCode / 100) === 5">
        <!-- <img
          class="net-error"
          src="~/assets/images/error/500.png"> -->
        <div> 哎呀…页面出错啦</div>
      </template>
      <template v-else>
        <!-- <img src="~/assets/images/error/404.png"> -->
        <p> 哎呀…找不到您访问的页面</p>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'error',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  computed: {
    statusCode() {
      return (this.error && this.error.statusCode) || 500;
    },
  },
};
</script>

<style lang="scss">
.p-error {
  padding-top: 60px;
  padding-bottom: 60px;
  &__wrap {
    width: 100%;
    padding-top: 180px;
    img {
      width: 700px;
      height: 540px;
    }
    p {
      margin-top: -165px;
    }
    .net-error {
      width: 500px;
      height: 340px;
      margin-top: 100px;
    }
    @media (max-width: 767px) {
      padding-top: 0rem;
    }
  }
}
</style>
