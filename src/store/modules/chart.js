import { getchartdata } from "api/chart";
import Cookies from "js-cookie";

const chart = {
    actions: {
        GetChartData({ commit, state }) {
            return new Promise((resolve, reject) => {
                getchartdata(Cookies.get("storeid"))
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
export default chart;
