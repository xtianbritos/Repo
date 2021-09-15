let persona = {};

document.addEventListener("DOMContentLoaded", () => {
	
	 document.getElementById("agregar").addEventListener("click", () => {
  
	  persona.nombre = document.getElementById("nombre").value; 
	  persona.edad = document.getElementById("edad").value;
	  persona.puntos = document.getElementById("valor").innerHTML;
	  
	  let date=new Date(); 
	  let mes = date.getMonth()+1;
	  persona.hora=date.getFullYear() + "-" + mes + "-" + date.getDate() + " " +date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
	
	  mostrar(persona);
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
				<p class="mb-1">`+ persona.edad +`</p>
			</div>
		</div>
	</div>
	`;
  };
	