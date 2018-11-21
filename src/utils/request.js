import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken, removeToken } from '@/utils/auto'

/*
  // 根据接口返回的信息正确选择是否选用白名单
  // 什么情况下该选用：  请求返回的信息只有单一的结果数据，而没有其它success，errorMsg等信息，无法进行判断时，选择单独处理
  const urlWhite = ['query', 'change']; //白名单列表
*/

const notify = msg => {
  Message({
    message: msg,
    type: 'warning'
  });
}

const errorHandle = (status, other, msg) => {
  switch (status) {
    // 401 未登录状态，跳转到登录
    case '401':
      this.$router.push('/login');
      break;
    // 403 token过期
    // 清除token并跳转登录页
    case '403':
      notify('登录过期，请重新登录');
      removeToken();
      setTimeout(() => {
        //登录操作
      })
      break;
    case '400':
      notify(msg);
      break;
    case '404':
      notify('请求资源不存在');
      break;
    case '500':
      notify(msg);
      break;
    default:
      console.log(other);
      break;
  }
}

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 1000 * 5 // request timeout
})

// 设置post请求头
service.default.headers.post['Content-Type'] = 'application/json';

// 请求拦截器
// 每次请求前,如果存在token则在请求头中携带token
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    /** 
     *   登录流程控制中，根据本地是否存在token判断用户的登录情况
     *   但是即使token存在，也要可能token是过期的，所以在每次的请求头中携带token
     *   后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
     *   然后我们可以再响应拦截器中，根据状态码进行一些统一的操作
     */

    /** 第一种：
     *   这里的token存放的就是cookie中的用户信息，
     *   在本项目中，通过引入第三方库Cookie,存放用户信息
     *   而用户信息的设置和获取都是写在store里的作为全局信息
     */
    if (store.getters.token) {
      config.headers['X-Token'] = getToken()
    }

    /** 第二种：(za-tnt项目)
     *   token同样是存放在cookie中的用户信息，
     *   不过下面这种并没有引入第三方库Cookie,而是在公共工具文件(utils.js这里在本项目中并没有使用，只为说明)
     *   里自定了设置cookie和获取cookie的方法
    */
    /*
      const token = utils.getCookie('user');
      token && (config.headers.Authorization = token);
    */

    return config;
  },
  error => {
    return Promise.reject(error);
  }
)

service.interceptors.response.user(
  res => res,

  /**  第一种接口返回情况
   * 
    res => {
      // if判断存在白名单情况下需要做的处理
      // 若存在，另处理白名单（例如queryList接口方法中返回的信息只有结果，不携带错误信息）
      if (urlWhite.includes(utils.urlSpllice(res.config.url))) {
        if (res.status == 200) {
          return Promise.resolve(res.data);
        }
      } else {

        // 下面为什么会有两种情况呢？
        //  1.两种情况的存在说明有接口返回的数据形式不统一；
        //  2.在这个例子里面，两种返回的接口形式都存在res.status的情况
        //      第一种来说更为具体，在res.status为200基础上，根据res.data.success的真假进一步判断或者说直接通过success判断
        //      第二种，则只需要res.status为200就可以判断为真，但是为了避免第一种情况，这时候就需要设置一个标识，在成功进入
        //      resolve的一层之后，立刻设置flag为false
        
        if (res.data.success || (store.state.flag && res.status == 200)) {
          store.state.flag = false;
          return Promise.resolve(res.data);
        } else {

        }
    },
  */

  /**  第二种接口返回情况，promise都会进入resolve的通道部分

   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
  // response => {
  //   const res = response.data
  //   if (res.code !== 20000) {
  //     Message({
  //       message: res.message,
  //       type: 'error',
  //       duration: 5 * 1000
  //     })
  //     // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
  //     if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
  //       // 请自行在引入 MessageBox
  //       // import { Message, MessageBox } from 'element-ui'
  //       MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
  //         confirmButtonText: '重新登录',
  //         cancelButtonText: '取消',
  //         type: 'warning'
  //       }).then(() => {
  //         store.dispatch('FedLogOut').then(() => {
  //           location.reload() // 为了重新实例化vue-router对象 避免bug
  //         })
  //       })
  //     }
  //     return Promise.reject('error')
  //   } else {
  //     return response.data
  //   }
  // },
  */
  error => {
    const { response } = error;
    if (response) {
      errorHandle(
        response.data.errorCode,
        response.statusText,
        response.data.errorMsg
      );
      return Promise.reject(response);
    } else { }
  }
);

export default instance;