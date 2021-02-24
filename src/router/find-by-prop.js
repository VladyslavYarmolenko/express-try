const users = require("./users");

function findByProp(key, value) {
	return users.find((user) => user[key] === value);
}

module.exports = findByProp;
