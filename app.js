//Define vars for DRY

var wineSource; 
var wineShowTemplate;
var editWineSource;
var editWineTemplate;


$(document).ready(function(){
	wineSource = $("#get-wine").html();
	wineShowTemplate = Handlebars.compile(wineSource);
	editWineSource = $("#edit-wine").html();
	editWineTemplate = Handlebars.compile(editWineSource);

});

// $("#addwinebn").on("click", function(){
// 	$("#newwine").html(addWineTemplate)
// })

// Setting up Backbone routes

$("#addwinebn").click(function(){
	$("#newwine").toggle();
});

$("#cancel").click(function(){
	$("#newwine").toggle();
});

var Router = Backbone.Router.extend({
	routes: {
		"":"index",
		"edit/:id": "edit_wine"	
	}
});

function getWines (){
		$.ajax({
		url: "http://daretodiscover.herokuapp.com/wines",
		type: "GET",
		success: function(data) { 

			var contents = wineShowTemplate({Wine: data});	

			$("#content").html(contents);	
		},
		error: function() {
			alert("something went wrong ..."); 
		}
	});
}

var router = new Router;

router.on("route:index", getWines);


router.on("route:edit_wine", function(id){
	$.ajax({
		url: "http://daretodiscover.herokuapp.com/wines/" + id,
		type: "GET",
		success: function(data){
			var html = editWineTemplate(data);
			$("#name" + id).html(html)

		},
		error: function(){
			alert("Something went wrong");
		}
	});
});

Backbone.history.start();


$(document).on("click", ".submit-edits", function(){
	$.ajax({
		url:"http://daretodiscover.herokuapp.com/wines/" + $(this).attr("edit_id"),
		type: "PUT",
		data: {
				name: $("input[name=name]").val(),
				description: $("input[name=description]").val(),
				picture: $("input[name=picture]").val(),
				price: $("input[name=price]").val(),
				grapes: $("input[name=grapes]").val(),
				country: $("input[name=country]").val(),
				year: $("input[name=year]").val()
		},
		success: function(data){
			window.location.href= "#";
		},
		error: function(data){
			alert("something went wrong");
		}
	});
});

$(document).on("click", "#add-wine", function(){
	$.ajax({
		url: "http://daretodiscover.herokuapp.com/wines",
		type: "POST",
		data: {
				name: $("input[name=newname]").val(),
				description: $("input[name=newdescription]").val(),
				picture: $("input[name=newpicture]").val(),
				price: $("input[name=newprice]").val(),
				grapes: $("input[name=newgrapes]").val(),
				country: $("input[name=newcountry]").val(),
				year: $("input[name=newyear]").val()
		},
		success: function(){
			// $("#add-product-modal").modal("hide");
			$("#newwine").toggle();
			getWines();
		},
		error: function() {
			alert("Something wrong adding a product");
		}
	});
});

$(document).on("click", ".delete-button",function(){
	$.ajax({
		url: "http://daretodiscover.herokuapp.com/wines/" + $(this).attr("id"),
		type: "DELETE",
		success: function(){
			window.location.href = "#";
		},
		error: function(){
			alert("Wrong")
		}
	});
})