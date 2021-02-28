const express = require("express");
const findByProp = require("./find-by-prop");
const getAllUsers = require("./get-all-users");
const addNewUser = require("./add-new-user");
const removeUser = require('./remove-user');

const router = express.Router();

router.route("/")
	.get((req, res) => {
		res.send("Hi world");
	});

router.route("/user")
	.get((req, res) => {
		res.redirect(308, "users");
	});

router.route("/users")
	.get((req, res) => {
		const users = getAllUsers();

		res.render("users", { users });
	})
	.post((req, res) => {
		
		const reqData = req.body;

		if (!reqData.name)
			return res.status(400).send('Name param is missed');

		if (!reqData.age)
			return res.status(400).send('Age param is missed');

		if (reqData.age <= 0)
			return res.status(400).send('User age must be positive');	
		
		const users = getAllUsers();

		let newUserId = 1;

		if (users.length !== 0) {
			newUserId = Number(users[users.length-1].id) + 1;
		}

		const newUserData = {
			id: String(newUserId),
			name: reqData.name,
			age: reqData.age
		};

		addNewUser(newUserData);
		
		res.status(201).send(newUserId);
	});

router.route("/users/:id")
	.get((req, res) => {
		const user = findByProp("id", req.params.id);

		res.render("user", {
			id: user.id,
			name: user.name,
			age: user.age,
		});
	})
	.patch((req, res) => {
		const editParams = ['name', 'age'];
		const user = findByProp("id", req.params.id);
		const reqData = req.body;

		if(!user)
			return res.status(400).send('User not found');

		if(!reqData || Object.keys(reqData).length === 0)
			return res.status(400).send('Missing some params');

		Object.keys(reqData).map(reqParam => {
			if (editParams.indexOf(reqParam) === -1) {
				delete reqData[reqParam];
			}
		});

		for(let reqParam in reqData){
			user[reqParam] = reqData[reqParam];
		}
		
		return res.status(200).json(user);
	})
	.delete((req, res) => {
		const reqData = req.body;
		const user = findByProp("id", req.params.id);

		
		const users = getAllUsers();
		let removedUser = {};

		for(let i = 0; i <users.length; i++){
			if(users[i].id === user.id){
				removedUser = removeUser(i);
			}
		}
		return res.status(404).json(removedUser);
	})

module.exports = router;
