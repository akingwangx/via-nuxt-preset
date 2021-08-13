<template>
  <el-dropdown
    trigger="hover"
    placement="bottom-start"
    class="product-dropdown-wrapper">
    <div class="flex justify-between items-center text-base product-icon-wrapper">
      <i class="iconfont icon-product"></i>
    </div>
    <el-dropdown-menu
      slot="dropdown"
      class="product-wrapper">
      <el-dropdown-item
        v-for="(item, index) in productList"
        :key="index"
        class="product-item">
        <a
          :href="item.link"
          target="_blank"
          rel="noopener noreferrer">
          <div class="flex start">
            <div
              class="flex justify-center flex-row items-center"
              style="width: 68px;height: 68px;">
              <img
                :src="item.logo"
                style="width: 30px;height: 30px;">
            </div>
            <div class="flex flex-col justify-center">
              <div
                class="text-base"
                style="color: #171d4b;">{{ item.title }}</div>
              <div
                class="mt-1 text-xs"
                style="color: #7e8aa6;">{{ item.subtitle }}</div>
            </div>
          </div>
        </a>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    productList() {
      return [
        {
          logo: require('~/assets/images/header/viabtc-logo.png'),
          title: 'ViaBTC',
          subtitle: '多币种矿池',
          shortTitle: '矿池',
          link: `https://www.viabtc.com/${this.langSuffix}`,
        },
        {
          logo: require('~/assets/images/header/viawallet-logo.png'),
          title: 'ViaWallet',
          subtitle: '去中心化多币种钱包',
          shortTitle: '钱包',
          link: `https://viawallet.com/${this.langSuffix}`,
        },
        {
          logo: require('~/assets/images/header/coinex-logo.png'),
          title: 'CoinEx Exchange',
          subtitle: '数字货币及其衍生品交易所',
          shortTitle: '交易所',
          link: `https://www.coinex.com/${this.langSuffix}`,
        },
        {
          logo: require('~/assets/images/header/chain-logo.png'),
          title: 'CoinEx智能链',
          subtitle: '去中心化公链生态系统',
          shortTitle: 'CoinEx智能链',
          link: `https://www.coinex.org/${this.langSuffix}`,
        },
        {
          logo: require('~/assets/images/header/oneswap-logo.png'),
          title: 'OneSwap',
          subtitle: '去中心化交易平台',
          shortTitle: '去中心化交易平台',
          link: `https://www.oneswap.net/${this.langSuffix}`,
        },
        {
          logo: require('~/assets/images/header/capital-logo.png'),
          title: 'ViaBTC Capital',
          subtitle: '区块链投资资本',
          shortTitle: '区块链投资资本',
          link: `https://capital.viabtc.com/${this.langSuffix}`,
        },
      ];
    },
    langSuffix() {
      return `?lang=${
        this.$lang.indexOf('zh_Han') >= 0 ? this.$lang : 'en_US'
      }`;
    },
  },
};
</script>

<style lang="scss">
.product-dropdown-wrapper {
  .product-icon-wrapper {
    .iconfont {
      color: #000;
      &:hover {
        color: theme('colors.green.500');
      }
    }
  }
}
.el-dropdown-menu {
  &.product-wrapper {
    top: 60px !important;
    padding: 0 !important;
    .popper__arrow {
      display: none;
    }
    .product-item {
      padding: 0 80px 0 8px;
      line-height: 1;
      &:hover {
        background-color: rgba(5, 205, 205, 0.1) !important;
      }
    }
  }
}
</style>
