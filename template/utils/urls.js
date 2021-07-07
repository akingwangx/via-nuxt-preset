// 默认都是正式环境的变量
let severApiDomain = '';
let clientApiDomain = '';

let poolDomain = '';
const MODE = process.env.MODE || 'production';
switch (MODE) {
  case 'development': // 本地dev开发改这个端口就好了
    severApiDomain = 'http://dev.viabtc.com:8090/res';
    clientApiDomain = 'http://dev.viabtc.com:8090/res';
    poolDomain = 'http://dev_pool.viabtc.com';
    break;
  case 'pre1':
    severApiDomain = 'http://dev.viabtc.com:7090/res';
    clientApiDomain = 'http://dev.viabtc.com:7090/res';
    poolDomain = 'http://test_pool1.viabtc.com';
    break;
  case 'pre2':
    severApiDomain = 'http://dev.viabtc.com:8090/res';
    clientApiDomain = 'http://dev.viabtc.com:8090/res';
    poolDomain = 'http://test_pool2.viabtc.com';
    break;
  case 'pre3':
    severApiDomain = 'http://dev.viabtc.com:9090/res';
    clientApiDomain = 'http://dev.viabtc.com:9090/res';
    poolDomain = 'http://test_pool3.viabtc.com';
    break;
  case 'preprod':
    severApiDomain = 'http://127.0.0.1:443/res';
    clientApiDomain = 'https://prepool.viabtc.com/res';
    poolDomain = 'https://prepool.viabtc.com';
    break;
  case 'production':
  default:
    severApiDomain = 'http://127.0.0.1:443/res';
    clientApiDomain = 'https://www.viabtc.com/res';
    poolDomain = 'https://www.viabtc.com';
}

module.exports = {
  poolDomain,
  severApiDomain,
  clientApiDomain,
};
