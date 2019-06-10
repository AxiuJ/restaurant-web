import {
    getliststaff,
    getdutyname,
    updatastaff,
    deletestaff,
    addstaff
} from "api/page";
import Cookies from "js-cookie";

const pagedata = {
    actions: {
        GetDutyName({ commit, state }) {
            return new Promise((resolve, reject) => {
                getdutyname()
                    .then(response => {
                        resolve(response.data);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        },
        GetListStaff({ commit, state }, page) {
            return new Promise((resolve, reject) => {
                getliststaff(page)
                    .then(response => {
                        resolve(response.data);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        },
        AddStaff({ commit, state }, staff) {
            staff.storeName = Cookies.get("storename");
            staff.storeId = Cookies.get("storeid");
            staff.createId = Cookies.get("staffid");
            staff.createName = Cookies.get("name");
            staff.createId = Cookies.get("staffid");
            return new Promise((resolve, reject) => {
                addstaff(staff)
                    .then(response => {
                        resolve(response.data);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        },
        DeleteStaff({ commit, state }, staffId) {
            return new Promise((resolve, reject) => {
                deletestaff(staffId)
                    .then(response => {
                        resolve(response.data);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        },
        UpdataStaff({ commit, state }, staff) {
            return new Promise((resolve, reject) => {
                updatastaff(staff)
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

export default pagedata;
