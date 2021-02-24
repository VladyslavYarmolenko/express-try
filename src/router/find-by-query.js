const users = require("./users");

function findByQuery(name) {
	let found = null;

	for (const user of users)
		if (user.name === name) {
			found = user;
			break;
		}

	return found;
}

module.exports = findByQuery;
