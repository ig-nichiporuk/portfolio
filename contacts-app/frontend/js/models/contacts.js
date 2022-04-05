class Contacts {
	async getContactsList() {
		const contacts = await fetch('http://localhost:4000/api/contacts');

		return await contacts.json();
	}

	async getContactItem(id) {
		const contact = await fetch(`http://localhost:4000/api/contact/${id}`);

		return await contact.json();
	}

	async setContactData(id, data) {
		await fetch('http://localhost:4000/api/contact/changes', {
			method: 'PUT',
			headers: {'Content-Type' : 'application/json'},
			body: JSON.stringify({id, data})
		});
	}

	async deleteContacts(id) {
		await fetch('http://localhost:4000/api/contact/delete', {
			method: 'DELETE',
			headers: {'Content-Type' : 'application/json'},
			body: JSON.stringify(id)
		});
	}
}

export default Contacts;
