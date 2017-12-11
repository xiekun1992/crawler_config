let { Config, Sequelize } = require('./model');

function destroy(id){
	// return Config.destroy({
 //    where:{ id }
	// });
	return Config.update({
		isDelete: 1
	},
	{
		where: { id, isDelete: 0 }
	});
}
function update({id, html, status}){
	return Config.update({ html, status }, {
    where: { id, isDelete: 0 }
  });
}
function create(url){
	return Config.create({ url });
}
function findAll(url){
	let condition = {
		isDelete: 0
	};
	if(url){
		condition.url = {
			[Sequelize.Op.like]: `%${url}%`
		}
	}
	return Config.findAll({
		// attributes: ['id', 'url', 'createdAt']
		// ,
		// order: ['id', 'DESC']
	}, {
		where: condition
	});
}
function findOne(id){
	return Config.findOne({
		where: { id, isDelete: 0 }
	});
}

module.exports = {
	destroy,
	update,
	create,
	findAll,
	findOne
}