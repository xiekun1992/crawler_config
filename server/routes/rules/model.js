const { sequelize, Sequelize } = require('../../utils').DBUtil;
const Rule = sequelize.define('rule', {
	rule: {
		type: Sequelize.STRING(1000)
	},
	configId: {
		type: Sequelize.INTEGER
	},
	isDelete:{
		type: Sequelize.INTEGER
	}
});

module.exports = {
  Rule,
  sequelize,
  Sequelize
}