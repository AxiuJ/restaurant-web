import { menusinit, updatamenus, addmenus, deletemenus,delectcategoryid,addcategory} from "api/menus";
import Cookies from "js-cookie";

const menus = {
    actions: {
        MenusInit({ commit, state }) {
            return new Promise((resolve, reject) => {
                menusinit(Cookies.get("storeid"))
                    .then(response => {
                        resolve(response.data);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        },
        UpdataMenus({ commit, state }, menus) {
            return new Promise((resolve, reject) => {
                updatamenus(menus)
                    .then(response => {
                        resolve(response.data);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        },
        AddMenus({ commit, state }, menus) {
            menus.createStaffId = Cookies.get("staffid");
            menus.storeId = Cookies.get("storeid");
            return new Promise((resolve, reject) => {
                addmenus(menus)
                    .then(response => {
                        resolve(response.data);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        },

        DeleteMenus({ commit, state }, menusId) {
            return new Promise((resolve, reject) => {
                deletemenus(menusId)
                    .then(response => {
                        resolve(response.data);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        },
        DeleteCategoryId({ commit, state },CategoryId){
            return new Promise((resolve, reject) => {
                delectcategoryid(Number(CategoryId))
                    .then(response => {
                        resolve(response.data);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        },
        AddCategory({ commit, state },CategoryName){
            return new Promise((resolve,reject)=>{
                addcategory(CategoryName,Cookies.get("storeid")).then(response=>{
                    resolve(response.data)
                }).catch(error=>{
                    reject(error);
                })
            })
        }
    }
};
export default menus;
