const axios = require('axios');
module.exports = {
  /** 从这些目录查询需要匹配的文件 */
  entry: {
    pages: './pages/',
    components: './components/',
    layouts: './layouts/',
  },
  output: {
    html: './static/viai18n-html', // 页面资源输出目录
    locale: 'new_locales', // 生成的多语言文件目录
  },
  /** 语言的相关配置 */
  lang: {
    base: 'zh_Hans_CN',
    // target: 'ru_RU',
  },
  /** 解析的相关配置 */
  resolve: {
    postfix: '.messages.json', // 匹配的文件后缀
  },
  /** 过滤 */
  exclude: {
    translated: {
      // 是否过滤掉已经翻译过的
      enable: false,
    },
    lang: ['zh_Hant_HK'],
    filePattern: [],
    key: [],
    text: [],
  },
  trans: {
    batch: true,
    async translate(items) {
      const fetchTranslation = async function(source) {
        try {
          const response = await axios.post(
            'http://trans.viabtc.com/api/trans/collect',
            source
          );

          return response.data.data || {};
        } catch (error) {
          console.error(error);
        }
      };
      /**
       * 没有匹配到的，可能是文案末尾多了“。”等符号，可以去掉再进行匹配
       */
      const regx = /(.+)([，。：！；,.:!;])$/;
      const fixSymbol = function(symbol, lang) {
        const map = {
          '，': ',',
          '。': '.',
          '：': ':',
          '！': '!',
          '；': ';',
          // 可能存在中文文案也使用英文符号
          ',': ',',
          '.': '.',
          ':': ':',
          '!': '!',
          ';': ';',
        };

        return /ja_JP|zh_Hant_HK|zh_Hans_CN/.test(lang) ? symbol : map[symbol];
      };

      const filters = items.filter(item => {
        return item.lang !== 'zh_Hans_CN';
      });
      /**
       * 匹配文案系统
       */
      const postData = filters.map(item => {
        return item.text;
      });
      const data1 = (await fetchTranslation(postData)) || {};
      const result = filters.map(item => {
        const value = data1[item.text]
          ? data1[item.text].trans[item.lang === 'ru_RU' ? 'ru_KZ' : item.lang]
          : undefined;
        const parts = value === undefined ? regx.exec(item.text) : undefined;

        return {
          ...item,
          value: value ? value.trim() : value,
          textLeft: parts && parts[1],
          textRight: parts && fixSymbol(parts[2], item.lang),
        };
      });
      const result1 = result.filter(item => item.value !== undefined);

      /**
       * 去除末尾“。”等符号后，再匹配文案系统
       */
      let result2 = result.filter(item => item.textLeft);
      const postData2 = result2.map(item => {
        return item.textLeft;
      });
      const data2 = (await fetchTranslation(postData2)) || {};

      result2 = result2.map(item => {
        let value = data2[item.textLeft]
          ? data2[item.textLeft].trans[item.lang]
          : undefined;

        if (value !== undefined) {
          value = value.trim();
          if (value.lastIndexOf(item.textRight) !== value.length - 1) {
            value = value + item.textRight;
          }
          console.error('\n已处理有末尾符号的文案===>', item.text);
        }
        return {
          ...item,
          value: value,
        };
      });
      return result2.concat(result1);
    },
  },
};
