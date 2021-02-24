const express = require("express");
const findByProp = require("./find-by-prop");
const getAllUsers = require("./get-all-users");

const router = express.Router();

router.route("/")
	.get((req, res) => {
		res.send("Hi world");
	});

router.route("/user")
	.get((req, res) => {
		res.redirect(308, req.path.replace(/\/user$/, "/users"));
	});

router.route("/users")
	.get((req, res) => {
		const users = getAllUsers();

		res.render("users", { users });
	});

router.route("/users/:id")
	.get((req, res) => {
		const user = findByProp("id", req.params.id);

		res.render("user", {
			id: user.id,
			name: user.name,
			age: user.age,
		});
	});

module.exports = router;
