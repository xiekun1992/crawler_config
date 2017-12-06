const db = require('../db_config');
const Config = db.sequelize.define('config', {
	url: {
		type: db.Sequelize.STRING
	},
	html: {
		type: db.Sequelize.TEXT
	},
	status: {
		type: db.Sequelize.INTEGER
	},
	isDelete:{
		type: db.Sequelize.INTEGER
	}
});

function findAll(){
  return Config.findAll({
  	attributes: ['id', 'url', 'createdAt']
  })
}

module.exports = {
  findAll,
  Config
}