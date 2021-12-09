const express = require('express'),
	router = express.Router(),
	config = require('config'),
	fs = require('file-system');

router.get('/api/services',(req, res) => {
	res.send(fs.readFileSync(config.get('database.services'), 'utf8'))
});

module.exports = router;
