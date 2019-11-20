const proxy = require("./proxyHelper");

export class WidgetConfigHelper {

    static getWidgetConfig = async () => {
        try {
            let response = await fetch(proxy + "/api/widgetConfig", {method: "GET"});
            return await response.json()
        } catch (error) {
            return console.log(error);
        }
    };

    static getWidgetById = async id => {
        try {
            let response = await fetch(proxy + "/api/widgetConfig/" + id, {method: "GET"});
            return await response.json()
        } catch (error) {
            return console.log(error);
        }
    };

    static addWidget = async userData => {
        try {
            let response = await fetch(proxy + "/api/widgetConfig", {
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
            let response = await fetch(proxy + "/api/widgetConfig/" + id, {method: "PUT"});
            return await response.json()
        } catch (error) {
            return console.log(error);
        }
    };

    static deleteWidget = async id => {
        try {
            let response = await fetch(proxy + "/api/widgetConfig/" + id, {method: "DELETE"});
            return await response.json()
        } catch (error) {
            return console.log(error);
        }
    };


}

