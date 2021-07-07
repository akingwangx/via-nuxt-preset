import Vue from 'vue';
import globalMessages from '~/pages/global.messages.json';
import cnLang from 'element-ui/lib/locale/lang/zh-CN';
import enLang from 'element-ui/lib/locale/lang/en';
import ruLang from 'element-ui/lib/locale/lang/ru-RU';
import twLang from 'element-ui/lib/locale/lang/zh-TW';
import esLang from 'element-ui/lib/locale/lang/es';
import faLang from 'element-ui/lib/locale/lang/fa';
import locale from 'element-ui/lib/locale';
import { findKeyValue } from '~/utils/helpers';
const elementLangs = {
  zh_Hans_CN: cnLang,
  zh_Hant_HK: twLang,
  en_US: enLang,
  ru_RU: ruLang,
  es_ES: esLang,
  fa_IR: faLang,
};
// use this mixin to tell our i18n helper which language is showing
// !!! the key must be $lang, which will be referenced by the helper !!!
export default ({ store, app }) => {
  if (process.client) {
    const langs = store.state.lang.locales.map(item => {
      return item.value;
    });
    const search = window.location.search || '';
    const matches = search
      .trim()
      .replace(/^[?#&]/, '')
      .split('&');
    for (let i = 0; i < matches.length; i++) {
      if (/^lang=/.test(matches[i])) {
        const lang = matches[i].replace(/^lang=/, '');
        if (lang && langs.indexOf(lang) !== -1) {
          app.$cookies.set('lang', lang, {
            path: '/',
            maxAge: 60 * 60 * 24 * 30,
          });
        }
      }
    }
  }

  if (Vue.$plugins_i18n_installed) {
    return;
  }
  Vue.$plugins_i18n_installed = true;

  Object.defineProperty(Vue.prototype, '$lang', {
    get() {
      return store.state.lang.lang;
    },
    set(value) {
      store.state.lang.lang = value;
    },
  });

  const $globalT = function(key) {
    key = key.replace(/\./g, '@@@');
    return (
      (globalMessages[Vue.prototype.$lang || 'en_US'] ||
        globalMessages['en_US'])[key] || '---'
    );
  };
  Vue.$globalT = $globalT;
  Vue.mixin({
    computed: {
      isChinese() {
        const $lang = this.$lang;
        return $lang === 'zh_Hans_CN' || $lang === 'zh_Hant_HK';
      },
      zendeskUrl() {
        const $lang = this.$lang;
        const zendeskLang =
          $lang === 'zh_Hans_CN'
            ? 'zh-cn'
            : $lang === 'zh_Hant_HK'
              ? 'zh-tw'
              : 'en-us';
        return `https://support.viabtc.com/hc/${zendeskLang}`;
      },
      coinexDomain() {
        return `https://www.coinex${this.isChinese ? 'web' : ''}.com`;
      },
      coinexUrl() {
        return `${this.coinexDomain}/register?channel=viabtc&lang=${
          this.$lang
        }`;
      },
    },
    methods: {
      $globalT,
    },
  });
  locale.i18n(k => {
    const current = elementLangs[Vue.prototype.$lang || 'en_US'];
    return findKeyValue(current, k);
  });
};
