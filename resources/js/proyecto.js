var post = function(){
		var self=this;
		self.userId;
		self.id;
		self.title;
		self.body;
	};

	var user = function(){
		var self= this;
		self.idUsuario;
		self.name;
		self.user;
		self.email;
		self.address;
		self.phone;
		self.website;
	};

	function cargarPost() {
				var root = 'https://jsonplaceholder.typicode.com';	

				$.ajax({
  				url: root + '/posts',
 		 		method: 'GET'
				}).then(function(data) {
				console.log(data);	
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
					+"<div class='col-md-10'>"
					+"<h3>"+ p.title+"</h3>"
					+"</div>"

					+"<div class='col-md-2'>"
					+"<br>"+"</br>"
					+"<button class='btn btn-info glyphicon "+(existe ? 'glyphicon-star': 'glyphicon-star-empty')
  					+" post_boton' data-postid= '"+p.id 
					+"'></button>"
					+"</div>"
					+"</div>"
					
					+"<div class='row'>"
					+"<div class='col-md-12'>"
					+"<p>"+p.body+"</p>"
					+"</div>"
					+"</div>"

					+"<div class='row'>"
					+"<div class='col-md-12'>"
					+"<a id='idUser' href='Usuarios.html?isusuario="+p.userId+" ' target='_blank' class='publicador'>"
					+"<span class='glyphicon glyphicon-user'>"+p.userId+"</span>" 
					+"</a>"
					+"</div>"
					+"</div>"

					$('#post').append(post);

				});
  					$('.post_user').click(function () {
  					var postu = $(this).data('postu');
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

		/*var variable= self.userId;
			function leevariable(){
    		alert(variable);
		};*/

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
