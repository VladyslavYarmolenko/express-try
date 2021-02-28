const users = require("./users");

function removeUser(i) {
      return users.splice(i , 1)
    }

module.exports = removeUser;

