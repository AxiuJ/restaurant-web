import fetch from 'utils/fetch';

export function getchartdata(StoreId) {
  return fetch({
    url: 'http://127.0.0.1:80/axiuj/chart/getchartdata',
    method: 'post',
    data:{StoreId}
  });
}