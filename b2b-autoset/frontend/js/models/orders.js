class Orders {
	async getOrdersList(unp, num, param, token) {
		const orders = await fetch(`http://localhost:3000/api/orders?token=${token}`, {
			method: 'POST',
			headers: {'Content-Type' : 'application/json'},
			body: JSON.stringify({unp, num, param})
		});

		return await orders.json();
	}

	async getSortOrdersList(unp, num, param, token) {
		const orders = await fetch(`http://localhost:3000/api/orders/sort?token=${token}`, {
			method: 'POST',
			headers: {'Content-Type' : 'application/json'},
			body: JSON.stringify({unp, num, param})
		});

		return await orders.json();
	}

	async getOrderByNum(unp, num, param, token) {
		const order = await fetch(`http://localhost:3000/api/orders/num?token=${token}`, {
			method: 'POST',
			headers: {'Content-Type' : 'application/json'},
			body: JSON.stringify({unp, num, param})
		});

		return await order.json();
	}

	async getOrderByUnp(unp, num, param, token) {
		const order = await fetch(`http://localhost:3000/api/orders/unp?token=${token}`, {
			method: 'POST',
			headers: {'Content-Type' : 'application/json'},
			body: JSON.stringify({unp, num, param})
		});

		return await order.json();
	}

	async getOrder(id, token) {
		const order = await fetch(`http://localhost:3000/api/order/${id}?token=${token}`);

		if (!order.ok) {
			throw new Error(`Невозможно отправить запрос на ${order.url}. ${order.status} ${order.statusText}`);
		}

		return await order.json();
	}

	async getServicesList() {
		const services = await fetch('http://localhost:3000/api/services');

		return await services.json();
	}

	async setOrderChanges(changesInfo, changesTasks, token) {
		await fetch(`http://localhost:3000/api/order/changes?token=${token}`, {
			method: 'PUT',
			headers: {'Content-Type' : 'application/json'},
			body: JSON.stringify({changesInfo, changesTasks})
		});
	}
}

export default Orders;
