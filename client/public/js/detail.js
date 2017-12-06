(function(){
	var paramPairs = location.search.slice(1).split('&');
	var params = {};
	paramPairs.forEach(function(p){
		var pair = p.split('=');
		params[pair[0]] = pair[1];
	});
	$("#save").on('click', function(){
		content.contentWindow.postMessage({
			op: 'getXPathRule'
		}, '*');
	});

	window.onmessage = function(ev){
		console.log(ev.data);
		switch(ev.data.op){
			case 'addSimilar': getSimilarNodesById(ev.data.data); break;
			case 'addSingle': getSingleNodeById(ev.data.data); break;
			case 'text': showNodesText(ev.data.data); break;
			case 'xPathRule': saveXPath(ev.data.data); break;
		}
	}
	function saveXPath(xPathRule){
		$.ajax({
			type: 'POST',
			url: '/api/rules/xpath/' + params.id,
			data: {
				rules: xPathRule.toString()
			},
			datatype: 'json'
		})
		.then(function(data){
			if(data.code == 20000){
				location.href="/";
			}else{
				alert(data.msg);
			}
		});
	}
	function showNodesText(textObj){
		var text = textObj.text, groupDom = $("#group" + textObj.groupId);
		if(groupDom.length > 0){
			if(text.length > 0){
				var html = "";
				text.forEach(function(t){
					if(t.type == 'img'){
						html += "<li><img src='" + t.text + "'></li>";
					}else{
						html += "<li>" + t.text + "</li>";
					}
				});
				groupDom.html(html);
				toggleResultDom(true);
			}else{
				groupDom.remove();
				if($("#text").children().length == 0){
					toggleResultDom(false);
				}
			}
		}else if(text.length > 0){
			$("#text").append("<ul id='group" + textObj.groupId + "' class='text'></ul>");
			var html = "";
			text.forEach(function(t){
				if(t.type == 'img'){
					html += "<li><img src='" + t.text + "'></li>";
				}else{
					html += "<li>" + t.text + "</li>";
				}
			});
			$("#group" + textObj.groupId).html(html);
			toggleResultDom(true);
		}
	}
	function toggleResultDom(needShow){
		if(needShow){
			$("#result").addClass('h361');
			$("#content").addClass('pb361');
		}else{
			$("#result").removeClass('h361');
			$("#content").removeClass('pb361');
		}
	}
	function getSingleNodeById(){

	}
	function getSimilarNodesById(nodeId){
		$.ajax({
			type: 'GET',
			url: '/api/nodes',
			data: {
				nodeId: nodeId,
				documentId: params.id
			},
			datatype: 'json'
		})
		.then(function(data){
			if(data.code == 20000){
				content.contentWindow.postMessage({
					op: 'highlight',
					data: data.data
				}, '*');
			}else{
				alert(data.msg);
			}
		}, function(data){
			alert('request send error.');
		});
	}
})();