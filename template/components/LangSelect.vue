<template>
  <el-dropdown
    class="c-common-header-langselect">
    <span class="flex items-center outline-none">
      <span class="ml-5 text-14 dd-text font-w400">{{ currentLangText }}</span>
      <i class="iconfont icon-arrow text-16"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="item in availableLocales"
        :key="item.value"
        :index="item.value">
        <div @click="onSetLang(item)">
          {{ item.text }}
        </div>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      currentLangText: 'lang/currentLangText',
      availableLocales: 'lang/availableLocales',
    }),
  },
  created() {
    console.log(this.$lang, this.currentLangText, this.availableLocales);
  },
  methods: {
    onSetLang(item) {
      this.$store.dispatch('lang/setLang', item.value);
      this.$axios.setHeader('Accept-Language', item.value);
      if (this.account) {
        this.$axios.post('/account/language/update').then();
      }
      this.$router.push(
        {
          query: Object.assign({}, this.$route.query, {
            lang: item.value,
          }),
        },
        () => {
          window.location.reload();
        }
      );
    },
  },
};
</script>

<style lang="scss">
.c-common-header-langselect {
}
</style>
