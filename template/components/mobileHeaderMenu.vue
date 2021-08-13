<template>
  <div>
    <button
      :class="showMobileMenu?'active':''"
      class="product-icon-wrapper"
      @click="toggleMenu">
      <i
        v-if="!showMobileMenu"
        class="iconfont icon-menu text-2xl"></i>
      <i
        v-else
        class="iconfont icon-close text-2xl"></i>
    </button>
    <div
      v-if="showMobileMenu"
      id="mobile-dropdown-menu-left">
      <el-menu
        :default-active="menuActiveIndex"
        class="left-menu">
        <template
          v-for="(item, index) in mainNavMenuItems">
          <!--下拉菜单 -->
          <el-submenu
            v-if="item.dropdownItems && item.dropdownItems.length"
            :key="index"
            :popper-append-to-body="true"
            :index="item.index || item.link"
            class="dropdown-menu-wrapper">
            <template slot="title">
              {{ item.title }}
            </template>
            <template v-for="(dropdownItem, dropdownIndex) in item.dropdownItems">
              <el-menu-item
                v-if="!dropdownItem.subMenuItems"
                :key="dropdownIndex"
                :index="dropdownItem.link"
                class="dropdown-link-container">
                <a
                  :href="dropdownItem.link"
                  class="dropdown-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  @click="showMobileMenu=false">
                  <span>{{ dropdownItem.title }}</span>
                </a>
              </el-menu-item>
            </template>
          </el-submenu>
          <!--无下拉菜单的内部链接导航-->
          <el-menu-item
            v-else
            :key="index"
            :index="item.index || item.link"
            :disabled="!!item.disabled">
            <template
              v-if="!item.disabled && item.link">
              <nuxt-link
                :to="item.link"
                class="header-link"
                :class="{'header-link-active': $route.path === item.link}"
                @click.native="showMobileMenu=false">
                {{ item.title }}
              </nuxt-link>
            </template>
          </el-menu-item>
        </template>
        <el-submenu
          trigger="click"
          index="lang"
          class="dropdown-menu-wrapper">
          <template
            slot="title"
            class="toggle-lang">
            {{ currentLangText }}
          </template>
          <el-menu-item
            v-for="item in availableLocales"
            :key="item.value"
            :index="item.value"
            class="language-choice">
            <div @click="onSetLang(item)">
              {{ item.text }}
            </div>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  components: {},
  data() {
    return {
      showMobileMenu: false,
    };
  },
  computed: {
    ...mapGetters({
      currentLangText: 'lang/currentLangText',
      availableLocales: 'lang/availableLocales',
    }),
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
    mainNavMenuItems() {
      const defaultMenu = [
        {
          title: '首页',
          link: '/',
          index: '/',
        },
        {
          title: '其他',
          link: '/other',
          index: '/other',
        },
      ];
      if (this.$device.isMobile) {
        const productMenuItem = {
          title: '产品',
          link: 'products',
          dropdownItems: [],
        };
        for (let i = 0; i < this.productList.length; i++) {
          const item = this.productList[i];
          if (item.shortTitle) {
            productMenuItem.dropdownItems.push({
              title: item.shortTitle,
              link: item.link,
            });
          }
        }
        defaultMenu.push(productMenuItem);
      }
      return defaultMenu;
    },
    menuActiveIndex() {
      return this.$route.path && '/' + this.$route.path.split('/')[1];
    },
  },
  methods: {
    toggleMenu() {
      this.showMobileMenu = !this.showMobileMenu;
    },
    onSetLang(item) {
      this.$emit('onSetLang', item);
    },
  },
};
</script>

<style lang="scss">
.product-icon-wrapper {
  .iconfont {
    color: #000;
  }
}
.active {
  .iconfont {
    @apply text-green-500;
  }
}

#mobile-dropdown-menu-left {
  position: absolute;
  top: 60px;
  left: 0;
  background: #fff;
  color: #000;
  width: 100%;
  height: calc(100vh - 60px);
  overflow: auto;
  z-index: 10;
  ul.el-menu {
    background: #fff;
    color: #000;
    overflow: hidden;
    // padding-bottom: 20px;
    .el-submenu {
      &:before {
        width: 80%;
        content: '';
        display: block;
        height: 0;
        margin: 0 auto;
      }
    }
    .el-menu-item:not(:first-of-type) {
      &:before {
        width: 80%;
        content: '';
        display: block;
        height: 0;
        margin: 0 auto;
      }
    }
    .el-menu-item {
      padding: 0 !important;
      &.is-disabled {
        display: none;
      }
      a {
        color: #000;
        width: 100%;
        font-size: 1.125rem;
        font-weight: 600;
        padding-left: 40px;
        display: block;
        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
  .el-menu--inline {
    background: #fff !important;
  }
  .el-menu-item.is-active,
  .el-menu-item:hover,
  .el-menu-item:focus {
    background-color: transparent;
  }
  .el-submenu {
    .el-menu-item {
      line-height: 40px;
      &:before {
        display: none !important;
      }
    }
  }
  .is-opened {
    .el-submenu__title {
      color: #05cdcd !important;
      i {
        color: #05cdcd !important;
      }
    }
  }
  .dropdown-menu-wrapper {
    .el-submenu__title {
      padding-left: 40px !important;
      font-size: 18px;
      color: #000;
      font-weight: 600;
      &:focus,
      &:hover,
      &:active {
        background-color: transparent;
      }
    }
    .el-menu {
      .el-menu-item.dropdown-link-container {
        .dropdown-link {
          font-size: 14px;
          padding-left: 60px;
          color: #000;
          &:focus,
          &:hover,
          &:active {
            background-color: transparent;
            color: #000;
          }
        }
      }
      .language-choice > div {
        font-size: 14px;
        padding-left: 60px;
        color: #000;
      }
    }
  }
  .header-link-active {
    color: #05cdcd !important;
  }
}
</style>
