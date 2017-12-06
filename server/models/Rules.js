const db = require('../db_config');
const Rule = db.sequelize.define('rule', {
	rule: {
		type: db.Sequelize.STRING(1000)
	},
	configId: {
		type: db.Sequelize.INTEGER
	},
	isDelete:{
		type: db.Sequelize.INTEGER
	}
});

module.exports = {
  Rule
}