const proxy = require("./proxyHelper");

export class TaskHelper {

    static getTasks = async () => {
        try {
            let response = await fetch(proxy + "/api/tasks", {method: "GET"});
            return await response.json()
        } catch (error) {
            return console.log(error);
        }
    };

    static getTaskById = async id => {
        try {
            let response = await fetch(proxy + "/api/tasks/" + id, {method: "GET"});
            return await response.json()
        } catch (error) {
            return console.log(error);
        }
    };

    static addTask = async userData => {
        try {
            let response = await fetch(proxy + "/api/tasks", {
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

    static updateTask = async id => {
        try {
            let response = await fetch(proxy + "/api/tasks/" + id, {method: "PUT"});
            return await response.json()
        } catch (error) {
            return console.log(error);
        }
    };

    static deleteTask = async id => {
        try {
            let response = await fetch(proxy + "/api/tasks/" + id, {method: "DELETE"});
            return await response.json()
        } catch (error) {
            return console.log(error);
        }
    };


}

