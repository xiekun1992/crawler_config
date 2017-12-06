var app = new Vue({
	el: '#configTable',
	data: {
		message: 'delete'
	},
	methods: {
		removeConfig: function(id){
			if(confirm('really want to delete record#' + id)){
				$.ajax({
					type: 'DELETE',
					url: '/api/configs/' + id,
					datatype: 'json'
				}).then(function(data){
					console.log(data);
					if(data.code == 20000){
						location.reload();
					}else{
						alert(data.msg);
					}
				}).catch(function(err){
					alert(err);
				});
			}
		}
	}
});