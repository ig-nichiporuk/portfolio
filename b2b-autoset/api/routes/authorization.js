const express = require('express'),
	router = express.Router(),
	config = require('config'),
	fs = require('file-system'),
	jwt = require('jsonwebtoken');

const {secret} = require("../secret");

const users = getActsFromDB();

const generateAccessToken = (name, login, is_manager) => {
	const payload = {name, login, is_manager}

	return jwt.sign(payload, secret);
}


router.post('/api/login',(req, res) => {
	const {email, password} = req.body,
		user = users.find(user => user.email === email);

	if (!user) {
		return res.status(400).json({'error-email': `Пользователь ${email} не найден`});
	}

	const validPassword = users.find(user => user.password == password);

	if (!validPassword) {
		return res.status(400).json({'error-password': `Введен неверный пароль`});
	}

	const token = generateAccessToken(user.name, user.login, user.is_manager);

	return res.json({token, name : user.name, status : user.is_manager})

});

function getActsFromDB() {
	return JSON.parse(fs.readFileSync(config.get('database.users'), 'utf8'));
}

module.exports = router;
