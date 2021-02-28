const users = require("./users");

function addNewUser(user) {
  users.push(user);
}

module.exports = addNewUser;

