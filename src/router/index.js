const express = require("express");
const findByProp = require("./find-by-prop");

const router = express.Router();

router.get("/", (req, res) => {
	res.send("Hi world");
});

router.get("/user", (req, res, next) => {
	req.user = findByProp("name", req.query.name);
	next();
}, (req, res) => {
	res.json(req.user);
});

router.get("/user/:id", (req, res) => {
	const user = findByProp("id", req.params.id)

	res.json(user);
});

module.exports = router;
