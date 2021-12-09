const express = require('express'),
	router = express.Router(),
	config = require('config'),
	fs = require('file-system');

const auth = require('../middleware/auth');

// API GET Order info
router.get('/api/order/:id', auth, (req, res) => {
	const ordersData = getOrdersFromDB(),
		orderTasksData = getOrdersTasksFromDB(),
		order = ordersData.find(order => order.id === req.params.id),
		orderTasks = orderTasksData.filter(order => order.order_id === req.params.id);

	if(req.user.is_manager !== '0') {

		order ? res.send([order, orderTasks]) : res.send({});
	} else {
		const userOrders = ordersData.filter(order => order.login == req.user.login),
			userOrder = userOrders.find(order => order.id === req.params.id);

		userOrder ? res.send([userOrder, orderTasks]) : res.send({});
	}
});

// API SET Order changes
router.put('/api/order/changes', auth, (req, res) => {
	if(req.user) {
		const ordersData = getOrdersFromDB(),
			tasksData = getTasksFromDB(),
			orderTasksData = getOrdersTasksFromDB(),
			{changesInfo, changesTasks} = req.body;

		const updateOrderTasksData = orderTasksData.filter(task => task.order_id != changesInfo.id);

		const updateOrders = ordersData.map(order => {
			if(order.id == changesInfo.id) {
				order.status_id = changesInfo.status_id;
				order.fio = changesInfo.fio;
				order.car = changesInfo.car;
				order.reg_number = changesInfo.reg_number;
				order.closed_at = changesInfo.closed_at;
				order.sum = '0';

				for (let obj of changesTasks) {
					const taskPrice = tasksData.find(task => task.id === obj.task_id).price;
					order.sum = `${(+order.sum + taskPrice * obj.amount).toFixed(2)}`;
				}
			}
			return order;
		});

		for (let obj of changesTasks) {
			updateOrderTasksData.push(obj);
		}

		setOrdersToDB(updateOrders);
		setOrdersTasksToDB(updateOrderTasksData);

		res.sendStatus(204);
	}
});

function getOrdersFromDB() {
	return JSON.parse(fs.readFileSync(config.get('database.orders'), 'utf8'));
}

function getOrdersTasksFromDB() {
	return JSON.parse(fs.readFileSync(config.get('database.order_tasks'), 'utf8'));
}

function getTasksFromDB() {
	return JSON.parse(fs.readFileSync(config.get('database.services'), 'utf8'));
}

function setOrdersToDB(ordersTasksData) {
	fs.writeFileSync(config.get('database.orders'), JSON.stringify(ordersTasksData));
}

function setOrdersTasksToDB(ordersTasksData) {
	fs.writeFileSync(config.get('database.order_tasks'), JSON.stringify(ordersTasksData));
}

module.exports = router;
