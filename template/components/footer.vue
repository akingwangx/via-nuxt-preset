<template>
  <el-footer
    v-if="!$device.isNative"
    id="c-footer">
    <div class="flex justify-between items-center">
      <Copyright />
    </div>
  </el-footer>
</template>

<script>
import Copyright from '~/components/copyright';

export default {
  components: { Copyright },
  data() {
    return {};
  },
  computed: {},
};
</script>

<style lang="scss">
#c-footer {
  width: 100%;
  height: 100% !important;
  background-color: #282936;
  color: #fff;
  z-index: 0;
  & > div {
    min-height: 300px;
  }
}
</style>
