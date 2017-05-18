var SEARCH_PAGE = "facebook";

function iteratePages( pages, id, callback )
{
	if( id < pages.length )
	{
		FB.api(
			"/" + pages[id].id,
			{
				fields: "is_verified"
			},
			function (response)
			{
				if ( response && !response.error )
				{
					if( response.is_verified )
						callback( pages[id].id );
					else
						iteratePages( pages, ++id, callback );
				}
			}
		);
	}
	else
		document.getElementById("log").innerHTML = "A verified account hasn't been found";
}

function getProfilePic( id )
{
	FB.api(
		"/"+id+"/picture?type=large",
		function (response)
		{
			if (response && !response.error)
			{
				document.getElementById("profilepic").src = response.data.url;
			}
		}
	);
}

function searchPage( )
{
	FB.api(
		"/search",
		{
			"type": "page",
			"q": SEARCH_PAGE
		},
		function (response)
		{
			console.log(">>>>>>>>",response);
			if (response && !response.error)
			{
				console.log(response.data[0].id);
				
				iteratePages( response.data, 0, getProfilePic );
			}
		}
	);
}

function checkLogin( response )
{
	console.log("-----------",response);
	if (response.status === 'connected') 
	{
		searchPage();
	}
	else {
		FB.login();
	}
}

window.fbAsyncInit = function()
{ 
	FB.init({
		appId      : '784539625045029',
		xfbml      : true,
		version    : 'v2.9'
	});

	FB.getLoginStatus( checkLogin );
};

(function(d, s, id){
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/it_IT/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));