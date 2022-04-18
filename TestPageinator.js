var Paginator = function(paginatorHolderId, pagesTotal, pagesSpan, pageCurrent, baseUrl){
	if(!document.getElementById(paginatorHolderId) || !pagesTotal || !pagesSpan) return false;

	this.inputData = {
		// paginatorHolderId - id of the html element where paginator will be placed as innerHTML (String): required
		paginatorHolderId: paginatorHolderId,
// 		pagesTotal - number of pages (Number, required)
		pagesTotal: pagesTotal,
// 		pagesSpan - number of pages which are visible at once (Number, required) 
		pagesSpan: pagesSpan < pagesTotal ? pagesSpan : pagesTotal,
		// pageCurrent - the number of current page (Number, required)
		pageCurrent: pageCurrent,
		// baseUrl - the url of the website (String)
		// if baseUrl is 'http://www.yourwebsite.com/pages/' the links on the pages will be:
		//http://www.yourwebsite.com/pages/1, http://www.yourwebsite.com/pages/2,	etc
		baseUrl: baseUrl ? baseUrl : '/pages/'
	};

	this.html = {
		holder: null,

		table: null,
		trPages: null, 
		tdsPages: null,
			
	};

	this.prepareHtml();
} 

/*
	Set all .html properties (links to dom objects)
*/
Paginator.prototype.prepareHtml = function(){

	this.html.holder = document.getElementById(this.inputData.paginatorHolderId);
	this.html.holder.innerHTML = this.makePagesTableHtml();

	this.html.table = this.html.holder.getElementsByTagName('table')[0];

	var trPages = this.html.table.getElementsByTagName('tr')[0]; 
	this.html.tdsPages = trPages.getElementsByTagName('td');
}
/*
	Make html for pages (table) 
*/
Paginator.prototype.makePagesTableHtml = function(){
	var tdWidth = (100 / this.inputData.pagesSpan) + '%';

	var html = '' +
	'<table width="100%">' +
		'<tr>' 
			for (var i=1; i<=this.inputData.pagesSpan; i++){
				html += '<td width="' + tdWidth + '"></td>';
			}
			html += '' + 
		'</tr>' +
		'<tr>' +
			'<td colspan="' + this.inputData.pagesSpan + '">' +
					'</div>' + 
					'<div class="current_page_mark"></div>' + 
				'</div>' +
			'</td>' +
		'</tr>' +
	'</table>';

	return html;
}

/*
	Global functions which are used
*/
function getElementsByClassName(objParentNode, strNodeName, strClassName){
	var nodes = objParentNode.getElementsByTagName(strNodeName);
	if(!strClassName){
		return nodes;	
	}
	var nodesWithClassName = [];
	for(var i=0; i<nodes.length; i++){
		if(matchClass( nodes[i], strClassName )){
			nodesWithClassName[nodesWithClassName.length] = nodes[i];
		}	
	}
	return nodesWithClassName;
}

function matchClass( objNode, strCurrClass ) {
	return ( objNode && objNode.className.length && objNode.className.match( new RegExp('(^|\\s+)(' + strCurrClass + ')($|\\s+)') ) );
}

function addEvent(objElement, strEventType, ptrEventFunc) {
	if (objElement.addEventListener)
		objElement.addEventListener(strEventType, ptrEventFunc, false);
	else if (objElement.attachEvent)
		objElement.attachEvent('on' + strEventType, ptrEventFunc);
}
function removeEvent(objElement, strEventType, ptrEventFunc) {
	if (objElement.removeEventListener) objElement.removeEventListener(strEventType, ptrEventFunc, false);
		else if (objElement.detachEvent) objElement.detachEvent('on' + strEventType, ptrEventFunc);
}

function getPageX( oElement ) {
	var iPosX = oElement.offsetLeft;
	while ( oElement.offsetParent != null ) {
		oElement = oElement.offsetParent;
		iPosX += oElement.offsetLeft;
		if (oElement.tagName == 'BODY') break;
	}
	return iPosX;
}