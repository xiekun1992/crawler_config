var db = require('./db_config');
var { Config } = require('./models/Configs');
var { Rule } = require('./models/Rules');

function initConnection(){
	db.sequelize
		.authenticate()
		.then(()=>{
			console.log('mysql connected.');
			Config
				.sync()
				.catch(err=>{
					console.error('table Config fail to create');
				});
			Rule
				.sync()
				.catch(err=>{
					console.log('table Rule fail to create');
				})
		})
		.catch(err=>{
			console.error(`unable to connect mysql:${err}`);
		});
}

module.exports = {
	initConnection
}