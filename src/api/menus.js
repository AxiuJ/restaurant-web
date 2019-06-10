import fetch from "utils/fetch";

export function menusinit(StoreId) {
    return fetch({
        url: "http://127.0.0.1:80/axiuj/menus/init",
        method: "post",
        data: { StoreId }
    });
}

export function updatamenus(menus) {
    return fetch({
        url: "http://127.0.0.1:80/axiuj/menus/updata",
        method: "post",
        data: menus
    });
}

export function addmenus(menus) {
    return fetch({
        url: "http://127.0.0.1:80/axiuj/menus/add",
        method: "post",
        data: menus
    });
}

export function deletemenus(MenusId) {
  return fetch({
      url: "http://127.0.0.1:80/axiuj/menus/delete",
      method: "post",
      data: {MenusId}
  });
}

export function delectcategoryid(CategoryId) {
    return fetch({
        url: "http://127.0.0.1:80/axiuj/menus/deletecategoryid",
        method: "post",
        data: {CategoryId}
    });
  }

export function addcategory(CategoryName,CreateStaffId){
    return fetch({
        url:"http://127.0.0.1:80/axiuj/menus/addcategory",
        method:"post",
        data:{CategoryName,CreateStaffId}
    })
}
