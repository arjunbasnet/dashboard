const proxy = require("./proxyHelper");

export class WidgetHelper {

    static getWidgets = async () => {
        try {
            let response = await fetch(proxy + "/api/widgets", {method: "GET"});
            return await response.json()
        } catch (error) {
            return console.log(error);
        }
    };

    static getWidgetById = async id => {
        try {
            let response = await fetch(proxy + "/api/widgets/" + id, {method: "GET"});
            return await response.json()
        } catch (error) {
            return console.log(error);
        }
    };

    static addWidget = async userData => {
        try {
            let response = await fetch(proxy + "/api/widgets", {
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

    static updateWidget = async id => {
        try {
            let response = await fetch(proxy + "/api/widgets/" + id, {method: "PUT"});
            return await response.json()
        } catch (error) {
            return console.log(error);
        }
    };

    static deleteWidget = async id => {
        try {
            let response = await fetch(proxy + "/api/widgets/" + id, {method: "DELETE"});
            return await response.json()
        } catch (error) {
            return console.log(error);
        }
    };


}

