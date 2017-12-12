var post = function(){
		var self=this;
		self.userId;
		self.id;
		self.title;
		self.body;
	};

	function cargarPost() {
				var root = 'https://jsonplaceholder.typicode.com';	

				$.ajax({
  				url: root + '/posts',
 		 		method: 'GET'
				}).then(function(data) {

				var localStorage = window.localStorage;
				var postFavoritos = {};
				var dbPostFavoritos = localStorage.getItem('postFavoritos');

				if(dbPostFavoritos != null){
				postFavoritos = JSON.parse(dbPostFavoritos);
				}

				//Recorrer el post
  				$.each(data, function(i, p){

  					var existe = p.id in postFavoritos;
  					
  					var post = "<div class='row'>"
					+"<div class='col-md-12'>"
					+"<h3>"+ p.title+"</h3>"
					+"</div>"

					+"<div class='col-md-10'>"
					+"<button class='btn btn-success glyphicon "+(existe ? 'glyphicon-star' : 'glyphicon-star-empty')
  					+" post_boton' data-postid= '"+p.id 
					+"'></button>"
					+"</div>"
					+"</div>"

					+"<div class='row'>"
					+"<div class='col-md-12'>"
					+"<a class='publicador'><span class='glyphicon glyphicon-user'>Yinet Jaquez - Yinetjc@hotmail.com </span>" 
					+"</a>"
					+"</div>"
					+"</div>"

					+"<div class='row'>"
					+"<div class='col-md-12'>"
					+"<p>"+p.body+"</p>"
					+"</div>"
					+"</div>"
					$('#post').append(post);
				});

  					$('.post_boton').click(function () {
  					var postid = $(this).data('postid');
  					var existe = agregarPostFavorito(postid);

  					//los if resumido en 2 lineas:
  					$(this).removeClass(existe ? 'glyphicon-star-empty' : 'glyphicon-star');
  					$(this).addClass(existe ? 'glyphicon-star' : 'glyphicon-star-empty');
  					
  					/*if(existe){

  						$(this).removeClass('glyphicon-star-empty');
  						$(this).addClass('glyphicon-star');
  					}else{

  						$(this).removeClass('glyphicon-star');
  						$(this).addClass('glyphicon-star-empty');
  					}*/				
  				});
			});
		};

	function agregarPostFavorito(postid){

		var localStorage = window.localStorage;
		var postFavoritos = {};
		var dbPostFavoritos = localStorage.getItem('postFavoritos');

		if(dbPostFavoritos != null){
			postFavoritos = JSON.parse(dbPostFavoritos);
		}
		
		var existe = false;
		if(postid in postFavoritos){
			delete postFavoritos[postid];
				
		}else{
			existe = true;
			postFavoritos[postid] = true;
		}

		localStorage.setItem('postFavoritos', JSON.stringify(postFavoritos));
		return existe;
	};

	$(document).ready(function () {
		cargarPost();
	});
