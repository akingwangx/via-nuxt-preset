export const state = () => ({
  locales: [
    {
      value: 'en_US',
      text: 'English',
    },
    {
      value: 'zh_Hans_CN',
      text: '简体中文',
    },
    {
      value: 'zh_Hant_HK',
      text: '繁体中文',
    },
    {
      value: 'ru_RU',
      text: 'русский',
    },
    {
      value: 'es_ES',
      text: 'Expañol',
    },
    {
      value: 'fa_IR',
      text: 'فارسی',
    },
  ], // available locales
  lang: 'en_US',
  rtlLanguages: ['fa_IR'],
});

export const mutations = {
  SET_LANG(state, lang) {
    state.lang = lang;
    if (process.client) {
      this.$cookies.set('lang', lang, { path: '/', maxAge: 60 * 60 * 24 * 30 });
      this.app.head.htmlAttrs = {
        ...this.app.head.htmlAttrs,
        dir: state.rtlLanguages.includes(lang) ? 'rtl' : 'ltr',
      };
    }
  },
};

export const actions = {
  setLang({ commit }, lang) {
    commit('SET_LANG', lang);
  },
};
export const getters = {
  currentLang: state => state.lang,
  availableLocales: state => state.locales,
  currentLangText: state => {
    const lang = state.locales.find(l => l.value === state.lang);
    return lang ? lang.text : '';
  },
};
