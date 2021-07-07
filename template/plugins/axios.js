export default function(ctx) {
  const { $axios, store, req, redirect, app } = ctx;
  const init = () => {
    let token = '';
    let lang = ''; // 语言
    let isWeixin = false;
    app.$cookies.remove('token', { domain: '.viabtc.com' }); // 避免旧的cookies冲突
    token = app.$cookies.get('token');
    if (process.client) {
      lang = app.$cookies.get('lang') || store.state.lang.lang;
      isWeixin = /micromessenger/.test(
        window.navigator.userAgent.toLowerCase()
      );
    } else {
      lang =
        app.$cookies.get('lang') ||
        req.headers['accept-language'] ||
        req.headers['Accept-Language'];

      const ua = req.headers['user-agent'] || req.headers['User-Agent'];
      isWeixin = !!ua && /micromessenger/.test(ua.toLowerCase());
    }

    $axios.defaults.timeout = 10000;
    $axios.setHeader('Authorization', token);
    $axios.setHeader('Accept-Language', lang);
    $axios.setHeader('platform', isWeixin ? 'wechat' : 'web'); // 后端需要区分app、web、微信
  };

  init();
  const lastReq = {};
  $axios.onRequest(request => {
    if (
      process.client &&
      { post: true, put: true, delete: true, patch: true }[
        request.method.toLowerCase()
      ]
    ) {
      if (Date.now() - lastReq.time <= 500 && lastReq.url === request.url) {
        return Promise.reject(new Error('Repeated request!'));
      }
      lastReq.url = request.url;
      lastReq.time = Date.now();
    }
  });
  // 拦截器直接code=0的数据，省去组件判断逻辑
  $axios.onResponse(res => {
    const { app } = ctx;
    const data = res.data;
    // code不为0，即为接口报错
    if (data && data.code) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(data, 'request failed');
      }
      const err = new Error(data.message);
      const code = err.code || data.code; // 优先取http状态码，最后才取业务状态码
      if (code === 401) {
        store.commit('user/RESET_STATE');
        app.$cookies.remove('token');
        checkRedirect(redirect, store, ctx.route);
        return; // 不带提示
      }
      if (code === 3001) {
        store.commit('user/SET_ACCOUNT', null);
        app.$cookies.remove('token');
        checkRedirect(redirect, store, ctx.route);
      }
      err.code = data.code;
      err.data = data.data;
      err.message = data.message;
      return Promise.reject(err);
    }
    return data.data;
  });
  $axios.onResponseError(err => {
    const { app } = ctx;
    const data = err.response ? err.response.data : err;
    const code = data.code;
    if (code === 401) {
      store.commit('user/RESET_STATE');
      if (process.client) {
        app.$cookies.remove('token');
      }
      checkRedirect(redirect, store, ctx.route);
      return Promise.reject(err);
    } else {
      if (!process.client) {
        console.error(err);
      }
    }
    return Promise.reject(err);
  });
}
// 在这些页面如果有token还是要获取用户信息，但是如果后端返回401 不需要跳转登录页面 清理掉用户信息即可
// 包括活动页面、观察者、微信绑定、移动端引用和所有其他一级页面
const NoRedirect = /^((\/weixin\/bind)|(\/mobile)|(\/tools)|(\/observer)|(\/activity)|(\/[^\/]+$))/i; // 对401状态进行特殊处理
const checkRedirect = (redirect, store, route) => {
  if (!NoRedirect.test(route.path)) {
    store.commit('user/SET_ACCOUNT', null);
    if (/^\/weixin\//.test(route.path)) {
      // /weixin路径下的页面没有登录态跳去绑定页面
      redirect('/weixin/bind');
    } else if (/^\/finance\/loan/.test(route.path)) {
      redirect(`/finance/loan-tutorial`);
    } else if (/^\/finance\/hedging/.test(route.path)) {
      redirect(`/finance/hedging-tutorial`);
    } else {
      redirect(`/signin?next=${encodeURIComponent(route.fullPath)}`);
    }
  }
};
