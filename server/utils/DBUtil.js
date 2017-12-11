
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


function connectDB(){
	return sequelize.authenticate();
}

async function initTable(){
	var { Config } = require('../routes/configs').configModel;
	var { Rule } = require('../routes/rules').ruleModel;
	try{
		await Config.sync();
		await Rule.sync();
	}catch(e){
		console.error(`tables fail to create: ${e}`);
	}
}

async function initConnection(){
	try{
		let res = await connectDB();
		console.log('mysql connected.');
		initTable();
	}catch(e){
		console.error(`unable to connect mysql: ${e}`);	
	}
}

module.exports = {
	initConnection,
	Sequelize,
	sequelize
}