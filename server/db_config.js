const Sequelize = require('sequelize');
const sequelize = new Sequelize('test', 'root', 'root', {
	host: 'localhost',
	dialect: 'mysql',
	pool: {
		max: 5,
		min: 0,
		acquire: 3000,
		idle: 1000
	}
});

module.exports = {
	sequelize,
	Sequelize
};