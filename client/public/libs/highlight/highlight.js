(function(){
	var link = document.createElement('link');
	link.rel = 'stylesheet';
	link.href='http://192.168.245.128:3000/libs/highlight/highlight.css';
	document.body.appendChild(link);

	var xPathRule = [];

	$('body *')
	.on('mouseover', function(e){
		e.stopPropagation();
		$(this).addClass('highlight');
	})
	.on('mouseout', function(e){
		$(this).removeClass('highlight');
	})
	.on('click', function(e){
		e.stopPropagation();
		send('addSimilar', $(this).attr('data-node-id'));
	})
	.on('contextmenu', function(e){
		e.stopPropagation();
		e.preventDefault();
		// send('addSingle', $(this).attr('data-node-id'));
	});


	function send(op, data){
		window.top.postMessage({
			data: data,
			op: op
		}, '*');
	}
	window.onmessage = function(ev){
		console.log(ev)
		switch(ev.data.op){
			case 'highlight': highlightAndAddText(ev.data.data); break;
			case 'getXPathRule': send('xPathRule', xPathRule); break;
		}
	}
	function highlightAndAddText(data){
		var index = xPathRule.indexOf(data.similarPath);
		var elementAttr = "";
		nodeIdArr = data.similarElementsId;
		nodeIdArr.forEach(function(id){
			elementAttr += ", [data-node-id='" + id + "']";
		});
		var elements = $(elementAttr.slice(2));

		if(index > -1){ // rule exist
			xPathRule[index] = null;
			elements.removeClass('xhighlight');
			getElementsText(index, []);
		}else{
			index = xPathRule.push(data.similarPath) - 1;
			elements.addClass('xhighlight');
			getElementsText(index, elements);
		}
	}
	function getElementsText(groupId, elements){
		var elementsText = [];
		$.each(elements || $("[class*=xhighlight]"), function(i, o){
			if(o.tagName.toLowerCase() == 'img'){
				elementsText.push({
					type: 'img',
					text: $(o).attr('src')
				});
			}else{
				elementsText.push({
					type: 'text',
					text: $(o).text()
				});
			}
		});

		send('text', {
			groupId: groupId,
			text: elementsText
		});
	}
})();