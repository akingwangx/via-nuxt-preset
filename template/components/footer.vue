<template>
  <el-footer
    v-if="!$device.isNative"
    id="c-footer">
    <div>
    </div>
  </el-footer>
</template>

<script>
export default {
  components: {},
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
