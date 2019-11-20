const proxy = require("./proxyHelper");

export class UserHelper {

    static getUsers = async () => {
        try {
            let response = await fetch(proxy + "/api/users", {method: "GET"});
            return await response.json()
        } catch (error) {
            return console.log(error);
        }
    };

    static getUserById = async id => {
        try {
            let response = await fetch(proxy + "/api/users/" + id, {method: "GET"});
            return await response.json()
        } catch (error) {
            return console.log(error);
        }
    };

    static addUser = async userData => {
        try {
            let response = await fetch(proxy + "/api/users/", {
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

    static updateUser = async id => {
        try {
            let response = await fetch(proxy + "/api/users/" + id, {method: "PUT"});
            return await response.json()
        } catch (error) {
            return console.log(error);
        }
    };

    static deleteUser = async id => {
        try {
            let response = await fetch(proxy + "/api/users/" + id, {method: "DELETE"});
            return await response.json()
        } catch (error) {
            return console.log(error);
        }
    };


}

