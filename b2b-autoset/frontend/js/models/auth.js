class Auth {
	async getData(email, password) {
		const user = await fetch('http://localhost:3000/api/login', {
			method: 'POST',
			headers: {'Content-Type' : 'application/json'},
			body: JSON.stringify({email, password})
		});

		return await user.json();
	}
}

export default Auth;
