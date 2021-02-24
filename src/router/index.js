const express = require("express");
const findByQuery = require("./find-by-query");
const users = require("./users");

const router = express.Router();

router.get("/", (req, res) => {
	res.send("Hi world");
});

router.get("/user", (req, res, next) => {
	req.user = findByQuery(req.query.name);
	next();
}, (req, res) => {
	res.json(req.user);
});

router.get("/user/:id", (req, res) => {
	const user = users.find((user) => user.id === req.params.id);

	res.json(user);
});

module.exports = router;
