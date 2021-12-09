class Acts {
	async getActsList(token) {
		const acts = await fetch(`http://localhost:3000/api/acts?token=${token}`);

		return await acts.json();
	}

	async getActsNum(num, token) {
		const acts = await fetch(`http://localhost:3000/api/acts?token=${token}`, {
			method: 'POST',
			headers: {'Content-Type' : 'application/json'},
			body: JSON.stringify({num})
		});

		return await acts.json();
	}

	async removeAct(code, token) {
		await fetch(`http://localhost:3000/api/acts?token=${token}`, {
			method: 'DELETE',
			headers: {'Content-Type' : 'application/json'},
			body: JSON.stringify({code})
		});
	}
}

export default Acts;
