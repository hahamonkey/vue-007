import axios from '@/utils/request';

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return axios({
    url: '/login/login',
    method: 'post',
    data
  })
}
