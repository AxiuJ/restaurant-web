import fetch from 'utils/fetch';

export function getliststaff(pagedata) {
  return fetch({
    url:'http://127.0.0.1:80/axiuj/staff/page',
    method:'post',
    data:pagedata
  });
}
export function getdutyname(){
  return fetch({
    url:'http://127.0.0.1:80/axiuj/staff/getdutyname',
    method:'post'
  })
}
export function updatastaff(staff){
  return fetch({
    url:'http://127.0.0.1:80/axiuj/staff/updata',
    method:'post',
    data:staff
  })
}
export function  deletestaff(staffId){
  return fetch({
    url:"http://127.0.0.1:80/axiuj/staff/updatausable",
    method:"post",
    data:{staffId}
  })
}
export function  addstaff(staff){
  return fetch({
    url:"http://127.0.0.1:80/axiuj/staff/add",
    method:"post",
    data:staff
  })
}
