const proxy = require("./proxyHelper");

export class UserHelper {

    static getUsers() {
        let users;
        fetch( proxy+"/api/users")
            .then((response) => response.json())
            .then(test => console.log(test))
            .catch(error => console.log(error));
        //console.log(users);
        //return users;
    }
}

