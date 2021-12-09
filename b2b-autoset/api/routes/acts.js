const express = require('express'),
	router = express.Router(),
	config = require('config'),
	fs = require('file-system');

const auth = require('../middleware/auth')

// API GET Acts list
router.get('/api/acts', auth,  (req, res) => {
	const actsData = getActsFromDB();

	if(req.user.is_manager !== '0') {
		res.send(actsData);
	} else {
		res.send(actsData.filter(act => act.login == req.user.login));
	}
});

// API GET Acts by Num
router.post('/api/acts', auth, (req, res) => {
	const actsData = getActsFromDB(),
		{num} = req.body;

	if(req.user.is_manager !== '0') {
		res.send(actsData.filter(act => act.code_1c.startsWith(num)));
	} else {
		const userActs = actsData.filter(act => act.login == req.user.login);
		res.send(userActs.filter(act => act.code_1c.startsWith(num)));
	}
});

// API DELETE Act
router.delete('/api/acts', (req, res) => {
	const actsData = getActsFromDB(),
		{code} = req.body,
		updatedData = actsData.filter(act => act.code_1c !== code);

	setActsToDB(updatedData);

	res.sendStatus(204);
});

function getActsFromDB() {
	return JSON.parse(fs.readFileSync(config.get('database.acts'), 'utf8'));
}

function setActsToDB(actsData) {
	fs.writeFileSync(config.get('database.acts'), JSON.stringify(actsData));
}

module.exports = router;
