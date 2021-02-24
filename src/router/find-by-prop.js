const users = require("./users");

/** @typedef {import("./users").User} User */

/**
 * @template {keyof User} Key
 * @param {Key} key
 * @param {User[Key]} value
 * @returns {User?}
 */
function findByProp(key, value) {
	return users.find((user) => user[key] === value);
}

module.exports = findByProp;
