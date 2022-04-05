const express = require('express'),
	router = express.Router(),
	config = require('config'),
	fs = require('file-system');

router.get('/api/contacts',  (req, res) => {
	res.send(getContactsFromDB());
});

router.get('/api/contact/:id', (req, res) => {
	const contact = getContactsFromDB().find(contact => contact.id == req.params.id);

	contact ? res.send(contact) : res.send([]);
});

router.delete('/api/contact/delete', (req, res) => {
	const ids = req.body,
		contacts = getContactsFromDB();
	let updateContacts = [];

	for (const id of ids) {
		const result = updateContacts.length ? updateContacts : contacts;
		updateContacts = result.filter(contact => contact.id !== id);
	}

	setContactToDB(updateContacts);

	res.sendStatus(204);
});

router.put('/api/contact/changes',  (req, res) => {
	const {id, data} = req.body,
		contacts = getContactsFromDB();

	if(id) {
		const updateContacts = contacts.map(contact => {
			if(contact.id == id) {
				contact.name = data.name;
				contact.surname = data.surname;
				contact.patronymic = data.patronymic;
				contact.birthdate.day = data.birthdate.day;
				contact.birthdate.month = data.birthdate.month;
				contact.birthdate.year = data.birthdate.year;
				contact.gender = data.gender;
				contact.family = data.family;
				contact.site = data.site;
				contact.company = data.company;
				contact.country = data.country;
				contact.city = data.city;
				contact.street = data.street;
				contact.house = data.house;
				contact.apartment = data.apartment;
				contact.postcode = data.postcode;
				contact.email = data.email;
				contact.phones = data.phones;
			}

			return contact;
		});

		setContactToDB(updateContacts);
	} else {
		contacts.push(data);
		setContactToDB(contacts);

	}

	res.sendStatus(204);
});

function getContactsFromDB() {
	const contacts = JSON.parse(fs.readFileSync(config.get('database.contacts'), 'utf8'));

	return contacts.sort((a, b) => a.surname > b.surname ? 1 : -1);
}

function setContactToDB(contactsData) {
	fs.writeFileSync(config.get('database.contacts'), JSON.stringify(contactsData));
}

module.exports = router;
