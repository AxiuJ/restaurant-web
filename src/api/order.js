import fetch from "utils/fetch";

export function addorder(foods,orderform) {
    return fetch({
        url: "http://127.0.0.1:80/axiuj/order/add",
        method: "post",
        data: { "foods":foods,"orderform":orderform }
    });
}

export function initordertable(pagedata,storeid){
    return fetch({
        url:"http://127.0.0.1:80/axiuj/order/init",
        method: "post",
        data: {pagedata,storeid}
    })
}

export function uporder(orderitems){
    return fetch({
        url:"http://127.0.0.1:80/axiuj/order/upprder",
        method: "post",
        data: orderitems
    })
}

export function checkout(orderform){
    return fetch({
        url:"http://127.0.0.1:80/axiuj/order/checkout",
        method: "post",
        data: orderform
    })
}