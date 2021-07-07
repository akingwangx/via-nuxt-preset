import Vue from 'vue';

export default function({ app, store, query, req, res, hotReload }) {
  if (hotReload) return;

  // 从query读取lang并设给cookie，防止跳转后丢lang
  const langs = store.state.lang.locales.map(item => item.value);

  if (query.lang && langs.indexOf(query.lang) !== -1) {
    if (process.client) {
      app.$cookies.set('lang', query.lang, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
      });
    } else {
      res.setHeader(
        'Set-Cookie',
        `lang=${query.lang}; path=/; max-age=${30 * 24 * 60 * 60}`
      );
    }
  }

  let preferLanguage = 'en_US';
  let acceptLanguage = '';

  if (req) {
    const ua = req.headers['user-agent'] || req.headers['User-Agent'];
    if (ua && /micromessenger/.test(ua.toLowerCase())) {
      // 微信直接用中文就可以了
      const lang = 'zh_Hans_CN';
      Vue.prototype.$lang = lang;
      return store.dispatch('lang/setLang', lang);
    }
    acceptLanguage = req.headers['accept-language'];
    preferLanguage = store.state.lang.lang || acceptLanguage || 'en_US';
  } else if (process.client) {
    acceptLanguage =
      store.state.lang.lang || navigator.language || navigator.browserLanguage;
  }
  if (acceptLanguage && acceptLanguage.indexOf(',') > 0) {
    acceptLanguage = acceptLanguage.split(',')[0];
  }
  if (acceptLanguage) {
    preferLanguage = acceptLanguage;
    if (/ru/i.test(preferLanguage)) {
      preferLanguage = 'ru_RU';
    } else if (/cn/i.test(preferLanguage)) {
      preferLanguage = 'zh_Hans_CN';
    } else if (/es/i.test(preferLanguage)) {
      preferLanguage = 'es_ES';
    } else if (/hk|tw/i.test(preferLanguage)) {
      preferLanguage = 'zh_Hant_HK';
    } else if (/en/i.test(preferLanguage)) {
      preferLanguage = 'en_US';
    } else if (/ir/i.test(preferLanguage)) {
      preferLanguage = 'fa_IR';
    } else {
      preferLanguage = 'en_US';
    }
  }

  let lang = query.lang || app.$cookies.get('lang') || preferLanguage;
  if (!store.state.lang.locales.find(item => item.value === lang)) {
    lang = 'en_US';
    if (!process.server) {
      app.$cookies.set('lang', query.lang, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
      });
    }
  }
  Vue.prototype.$lang = lang;
  const rtl = store.state.lang.rtlLanguages;

  app.head.htmlAttrs = {
    ...app.head.htmlAttrs,
    dir: rtl && rtl.includes(lang) ? 'rtl' : 'ltr',
  };
  app.$axios.setHeader('Accept-Language', lang);
  return store.dispatch('lang/setLang', lang);
}