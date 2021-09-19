let persona = {};

document.addEventListener("DOMContentLoaded", () => {

	
	 document.getElementById("agregar").addEventListener("click", () => {

		if (document.getElementById("nombre").value === ""){
			persona.nombre = "Anónimo";
		}else {
			persona.nombre = document.getElementById("nombre").value; 
		}
		if (document.getElementById("comentario").value === "") {
			persona.comentario = "Sin comentario.";
		} else {
			persona.comentario = document.getElementById("comentario").value;
		}
		persona.puntos = document.getElementById("valor").innerHTML;
				
		let date=new Date(); 
		persona.hora=date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + " " +date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
				
		mostrar(persona);
				
		document.getElementById("nombre").value = "";
		document.getElementById("comentario").value = "";
		document.getElementsByName("estrellas").forEach( radio => { if (radio.checked == true){radio.checked = false}});
		document.getElementById("valor").innerHTML ="";
  
	  
	});
  });
  
  
  function mostrar (){ 

	tabla.innerHTML += `
	<div class="list-group-item">
		<div class="row">
			<div class="col">
				<div class="d-flex w-100 justify-content-between">
					<h4 class="mb-1">`+ persona.nombre +`</h4>
					<small class="text-muted">` + persona.hora + `</small>
				</div>
				<small class="text-muted">` + score(persona.puntos) + `</small>
				<p class="mb-1">`+ persona.comentario +`</p>
			</div>
		</div>
	</div>
	`;
  };
	