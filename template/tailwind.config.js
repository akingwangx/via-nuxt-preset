module.exports = {
  important: true,
  theme: {
    fontFamily: {
      body:
        'PingFangSC-Regular, PingFang SC, Helvetica Neue, Helvetica, Hiragino Sans GB, Microsoft YaHei, 微软雅黑, Arial, sans-serif',
      mono:
        'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    },
    screens: {
      xs: { max: '767px' },
      sm: '768px', // 默认 @media (min-width: 123px)
      md: '1200px',
      lg: '1920px',
    },
    colors: {
      transparent: 'transparent',
      gray: {
        300: '#999fb9',
        400: '#3d4c5b',
        500: '#000d36',
      },
      white: '#FFF',
      green: {
        500: '#05cdcd',
      },
      red: {
        500: '#e51d36',
      },
      yellow: {
        500: '#ff9900',
      },
    },
    lineHeight: {
      none: '1',
      18: '18px',
      20: '20px',
      24: '24px',
      26: '26px',
    },
    borderRadius: {
      none: '0',
      0: '0',
      4: '4px',
      full: '9999px',
    },
    boxShadow: {
      none: 'none',
    },
    extend: {
      // 扩展默认
      width: {
        auto: 'auto',
        1200: '1200px',
      },
      minWidth: {
        auto: 'auto',
        1200: '1200px',
      },
      maxWidth: {
        auto: 'auto',
        1200: '1200px',
      },
      opacity: {
        10: '0.1',
      },
      zIndex: {
        1: 1,
      },
      fontSize: {
        0: ['0px', '0px'],
        12: ['12px', '14px'],
        14: ['14px', '20px'], // [fontSize, lineHeight]
        16: ['16px', '22px'],
        18: ['18px', '24px'],
        20: ['20px', '26px'],
        22: ['22px', '26px'],
        24: ['24px', '28px'],
        30: ['30px', '36px'],
        32: ['32px', '38px'],
        36: ['36px', '50px'],
        40: ['40px', '56px'],
      },
    },
  },
  variants: {},
  plugins: [],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.MODE === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js',
    ],
  },
};
