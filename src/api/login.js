import fetch from 'utils/fetch';

export function loginByEmail(username, password) {
  const data = {
    username,
    password
  };
  return fetch({
    url: 'http://127.0.0.1:80/axiuj/staff/login',
    method: 'post',
    data
  });
}

export function logout() {
  return fetch({
    url: '/login/logout',
    method: 'post'
  });
}

export function getInfo(staffId) {
  return fetch({
    url: 'http://127.0.0.1:80/axiuj/staff/info',
    method: 'post',
    data: { staffId }
  });
}

