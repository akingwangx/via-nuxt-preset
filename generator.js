module.exports = (api, options, rootOptions) => {
  // 项目依赖
  api.extendPackage({
    "scripts": {
      "dev": "nodemon server/index.js --watch server",
      "build": "nuxt build",
      "lint": "eslint --fix --ext .js,.vue --ignore-path .gitignore .",
      "analyze": "nuxt build --analyze",
      "build-online": "git checkout . && git pull && npm i --production && npm run build ",
      "build-preprod": "cross-env NODE_ENV=preprod MODE=preprod nuxt build",
      "deploy-online": "pm2 delete --silent pool || : && npm run build-online && pm2 startOrRestart ecosystem.json --only pool --env production  --update-env",
      "deploy-preprod": "pm2 delete --silent pool-preprod || : && git checkout . && git pull && npm i --production && npm run build-preprod && pm2 startOrRestart ecosystem.json --only pool-preprod --env preprod  --update-env",
      "generate": "nuxt generate",
      "purelint": "cross-env NODE_ENV=production eslint --ext .js,.vue .",
      "start": "cross-env NODE_ENV=production node server/index.js",
      "test-prod": "pm2 delete --silent pool || : && npm run build && pm2 startOrRestart ecosystem.json --only pool --env production"
    },
    "dependencies": {
      "@nuxtjs/axios": "^5.12.5",
      "@nuxtjs/device": "^1.2.3",
      "@nuxtjs/google-analytics": "^2.4.0",
      "@nuxtjs/stylelint-module": "^4.0.0",
      "@nuxtjs/tailwindcss": "^4.0.1",
      "accept-language-parser": "^1.5.0",
      "chinese-s2t": "^1.0.0",
      "cookie-universal-nuxt": "^2.1.4",
      "core-js": "^3.6.5",
      "cross-env": "^5.2.1",
      "element-ui": "^2.12.0",
      "koa": "^2.8.2",
      "node-sass": "^4.13.1",
      "nuxt": "^2.15.3",
      "sass-loader": "^7.3.1",
      "viai18n-loader": "0.0.41",
      "vue": "^2.6.12",
      "vuex": "^3.4.0"
    },
    "devDependencies": {
      "babel-eslint": "^10.1.0",
      "eslint": "^6.7.2",
      "eslint-config-prettier": "^3.1.0",
      "eslint-loader": "^2.2.1",
      "eslint-plugin-import": "^2.18.2",
      "eslint-plugin-prettier": "2.6.2",
      "eslint-plugin-vue": "^6.2.2",
      "nodemon": "^1.19.3",
      "postcss": "^8.2.8",
      "pre-commit": "^1.2.2",
      "prettier": "1.14.3",
      "stylelint": "^13.6.1",
      "stylelint-config-prettier": "^8.0.2",
      "stylelint-config-recommended": "^3.0.0"
    }
  });
  api.render(files => {
    Object.keys(files)
      .filter(path => path.startsWith('src/') || path.startsWith('public/'))
      .forEach(path => delete files[path])
  })
  // 生成项目文件
  api.render('./template', {
    projectName: rootOptions.projectName,
    test: options.test
  });
};