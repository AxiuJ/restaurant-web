import { addorder, initordertable, uporder,checkout} from "api/order";
import Cookies from "js-cookie";

const order = {
    actions: {
        Checkout({ commit, state }, orderform){
            return new Promise((resolve, reject) => {
                checkout(orderform)
                    .then(response => {
                        resolve(response.data);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        },
        Uporder({ commit, state }, orderitems) {
            return new Promise((resolve, reject) => {
                uporder(orderitems)
                    .then(response => {
                        resolve(response.data);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        },
        InitOrderTable({ commit, state }, pagedate) {
            return new Promise((resolve, reject) => {
                initordertable(pagedate, Cookies.get("storeid"))
                    .then(response => {
                        resolve(response.data);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        },
        AddOrder({ commit, state }, { foods, price, deskid }) {
            var orderform = {
                StaffId: parseInt(Cookies.get("staffid")),
                StaffName: Cookies.get("name"),
                StoreId: Cookies.get("storeid"),
                Price: price,
                DeskId: deskid
            };

            return new Promise((resolve, reject) => {
                addorder(foods, orderform)
                    .then(response => {
                        resolve(response.data);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        }
    }
};
export default order;
