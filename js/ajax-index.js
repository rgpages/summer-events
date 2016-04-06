// BE HERE NOW 

var bhnurl = 'http://registerguard.com/csp/cms/sites/rg/feeds/json.csp?items=1&subcats=26433409'
var bhnjson = bhnurl + '&callback=?';
var hits;
var stories;

$.getJSON(bhnjson, function(data){
	//response data are now in the result variable
	// console.log(data);
	// console.log(data.stories);
	hits = data.hits;
	stories = data.stories;
	$.each( stories, function( i, d ) {
		//console.log(d[i].headline);
		// console.log(d.headline);
		$('#bhn').html('<a href="' + d.server + d.path + '" target="_blank">' + d.headline + '</a>');
	});
});

// GO CALENDAR
var gourl = 'http://go.registerguard.com/api/json/';
var godata;
var success;

$.ajax({
	dataType: "jsonp",
	jsonp: "callback",
	jsonpCallback: "widget_data",
	url: gourl,
	data: godata
}).success(function(godata){
	var days = godata[0].events;
	var html = '';
	
	$.each(days, function (i, d){
		//console.log(d.date);
		var items = d.items;
		html = html + '<h3 class="sh6">' + d.date + '</h3>';
		html = html + '<ul>';
		$.each(items, function(ii, dd){
			//console.log(" - " + dd.title);
			html = html + '<li><b>' + dd.category + '</b>: <a href="' + dd.uri + '">' + dd.title + '</a></li>';
		});
		html = html + '</ul>';
	});
	
	$('#go').html(html);
});

// SHUFFLE FUNCTION
function shuffle(array) {
	var m = array.length, t, i;
	// While there remain elements to shuffle…
	while (m) {
	// Pick a remaining element…
	i = Math.floor(Math.random() * m--);
	// And swap it with the current element.
	t = array[m];
	array[m] = array[i];
	array[i] = t;
	}
	return array;
}

// TURIN
var turinurl = 'http://projects.registerguard.com/turin/json-summer/';
var turinsubcats = 'subcats=21608910,153,19525878,19525916,19525960,19525172,19525263,19525262,19525181,19525186,2603694,19525212,19525254,19525221,19525226,19525237,19525255,19525240,27108154,19525241,19525189,27108148,19525242,19525243,19525244,19525268,19525253,19525245,27108147,19525269,19525252,5730697,21410963,27096213,550,21746381,552,20306199,20281419,21746387,21746385,20281412,20281413,20281401,21746386,556,21460484,21746463,800,801,191222,802,803,726376,804,806,19525555,19525559,23374534,19525548,19525571,23374546,19525576,29330545,19525545,19525573,23374549,19525572,19525549,19525558,19525562,29330546,19525550,29330544,27632499,27632499'
var turinitems = 'items=50'
var turinjson = turinurl + '?' + turinsubcats + '&' + turinitems + '&callback=?';

$.getJSON(turinjson, function(data){
	//response data are now in the result variable
	var server = 'http://projects.registerguard.com';
	var html = '';
	//data = shuffle(data);
	// console.log(data.stories);
	$.each( data, function( i, d ) {
		//console.log(d[i].headline);
		// console.log(d.headline);
		html = html + '<li><b>' + d.subcategory + '</b>: <a href="' + server + d.link + '" target="_blank">' + d.headline + '</a></li>';
		html = html + '<img src="' + d.image + '">';
	});
	$('#turin').html('<ul>' + html + '</ul>');
});
