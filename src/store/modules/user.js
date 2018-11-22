const user = {
  state: {

  },
  mutations: {

  },
  acitons: {
    //用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        LoginByUsername(username, userInfo.password).then(res => {

        }).catch(err => {

        })
      })
    }
  }
}
