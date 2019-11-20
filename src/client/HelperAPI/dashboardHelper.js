const proxy = require("./proxyHelper");

export class DashboardHelper {

    static getDashboards = async () => {
        try {
            let response = await fetch(proxy + "/api/dashboard", {method: "GET"});
            return await response.json()
        } catch (error) {
            return console.log(error);
        }
    };

    static getDashboardById = async id => {
        try {
            let response = await fetch(proxy + "/api/dashboard/" + id, {method: "GET"});
            return await response.json()
        } catch (error) {
            return console.log(error);
        }
    };

    static addDashboard = async userData => {
        try {
            let response = await fetch(proxy + "/api/dashboard", {
                method: "POST",
                body: JSON.stringify(userData),
                headers: {
                    "Content-type": "application/json"
                }
            });
            return await response.json()
        } catch (error) {
            return console.log(error);
        }
    };

    static updateDashboard = async id => {
        try {
            let response = await fetch(proxy + "/api/dashboard/" + id, {method: "PUT"});
            return await response.json()
        } catch (error) {
            return console.log(error);
        }
    };

    static deleteDashboard = async id => {
        try {
            let response = await fetch(proxy + "/api/dashboard/" + id, {method: "DELETE"});
            return await response.json()
        } catch (error) {
            return console.log(error);
        }
    };

    static getDashboardConfigByUserId = async id => {
        try {
            let response = await fetch(proxy + "/api/dashboard/user/" + id, {method: "GET"});
            return await response.json()
        } catch (error) {
            return console.log(error);
        }
    };

}

