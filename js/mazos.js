let datos;
let pagina = 1;

function mostrarMazos() {
  let cartas = "";
  let desde = pagina * 10 - 10;
  let hasta = pagina * 10;
  for (let i = desde; i < hasta; i += 1) {
    if (i < datos.length) {
      cartas += `
      <div class="mazo">
      <figure>
      <img src="../images/deck-image/${datos[i].archivo}.jpg" class="poster" onclick="detalleMazo(${i})" alt="${datos[i].nombre}">
      <figcaption>
      <div><div><h3>${datos[i].nombre}</h3></div></div>
      </figcaption>
      </figure>
      </div>
      `;
    }
  }
  document.getElementById("contenedor").innerHTML = cartas;
}

function detalleMazo(i) {
  Swal.fire({
    title: datos[i].nombre,
    text: datos[i].descripcion,
    imageUrl: "../images/deck-image/" + datos[i].archivo + ".jpg",
    imageWidth: 155,
    imageHeight: 220,
    imageAlt: datos[i].alt,
    background: "#fff url(../images/fondo-modal.png)",
  });
}

function paginaSiguiente() {
  if (pagina < Math.ceil(datos.length / 10)) {
    pagina += 1;
    mostrarMazos();
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "No hay páginas después de esta!",
      background: "#fff url(../images/fondo-modal.png)",
    });
  }
}

function paginaAnterior() {
  if (pagina > 1) {
    pagina -= 1;
    mostrarMazos();
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "No hay páginas antes de esta!",
      background: "#fff url(../images/fondo-modal.png)",
    });
  }
}

const cargarMazos = async () => {
  try {
    const respuesta = await fetch("../data/decks.JSON");
    // Si la respuesta es correcta
    if (respuesta.status === 200) {
      datos = await respuesta.json();

      let cartas = "";
      for (let i = 0; i < 10; i += 1) {
        cartas += `
					<div class="mazo">
						<figure>
							<img src="../images/deck-image/${datos[i].archivo}.jpg" class="poster" onclick="detalleMazo(${i})" alt="${datos[i].nombre}">
							<figcaption>
						 		 <div><div><h3>${datos[i].nombre}</h3></div></div>
							</figcaption>
					  	</figure>
					</div>
				`;
      }

      document.getElementById("contenedor").innerHTML = cartas;
      Swal.fire({
        icon: "warning",
        title: "Atención",
        background: "#fff url(../images/fondo-modal.png)",
        html: `Utilice los botones "Anterior" y "Siguiente" para navegar entre las diferentes páginas.<br><br>
        Haga click sobre las imágenes para más información`,
      });
    } else if (respuesta.status === 401) {
      console.log("Pusiste la llave mal");
    } else if (respuesta.status === 404) {
      console.log("La carta que buscas no existe");
    } else {
      console.log("Hubo un error y no sabemos que paso");
    }
  } catch (error) {
    console.log(error);
  }
};

cargarMazos();
