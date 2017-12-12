const { sequelize, Sequelize} = require('../../utils').DBUtil;
const Config = sequelize.define('config', {
	url: {
		type: Sequelize.STRING
	},
	html: {
		type: Sequelize.TEXT
	},
	status: {
		type: Sequelize.INTEGER
	},
	isDelete:{
		type: Sequelize.INTEGER
	}
});

module.exports = {
  Config,
  Sequelize
}