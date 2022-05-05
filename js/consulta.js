function repartir() {
  let tmp = cartas[cartas.length - 1];
  let id;
  cargarPos();
  cartasTiradas.push(tmp);
  // if (cartas.length - 1 < 10) {
  //   id = "carta0" + String(cartas.length - 1);
  // } else {
  //   id = "carta" + String(cartas.length - 1);
  // }
  // lo cambio por un operador ternario
  cartas.length - 1 < 10
    ? (id = "carta0" + String(cartas.length - 1))
    : (id = "carta" + String(cartas.length - 1));
  let elemento = document.getElementById(id);
  elemento.remove();
  cartas.pop();
  if (cartasTiradas.length == 10) {
    let btn = document.getElementById("botonera");
    btn.innerHTML =
      '<a href="javascript:void(0)" onclick="posicion()" class="btn" id="accion">Comenzar Lectura</a>';
    let fondo = document.getElementById("pergamino");
    fondo.style.backgroundImage = "url('../images/pergamino.png')";
    btn = document.getElementById("accion");
    btn.style.display = "inline-block";
    let tabla = document.getElementById("deck");
    tabla.remove();
    // let interpretacion = document.getElementById("interpretación")
    // interpretacion.classList.add("pergamino");
  } else if (cartasTiradas.length == 1) {
    let btn = document.getElementById("botonera");
    btn.innerHTML =
      '<a href="javascript:void(0)" onclick="repartir()" class="btn" id="accion">Sacar Otra Carta</a>';
  }
  let ultimaCartaRepartida = "card" + String(cartasTiradas.length);
  let repartir = document.getElementById(ultimaCartaRepartida + "--frente");
  let img = "../images/reverso.jpg";
  repartir.innerHTML = `<img src= ${img} class="tirada" alt= ${tmp.nombre}>`;
  // if (tmp.posicion) {
  //   img = "../images/" + tmp.imgVertical;
  // }else {
  //   img = "../images/" + tmp.imgInvertida;
  // }
  // lo cambio por un operador ternario
  tmp.posicion
    ? (img = "../images/" + tmp.imgVertical)
    : (img = "../images/" + tmp.imgInvertida);
  repartir = document.getElementById(ultimaCartaRepartida + "--reverso");
  repartir.innerHTML = `<img src= ${img} class="tirada" alt= ${tmp.nombre}>`;
}

function posicion() {
  if (ultimaCarta != "card0") {
    document.getElementById(ultimaCarta).classList.toggle("resaltada");
  }
  voltear();
  posicionCarta();
  let btn = document.getElementById("botonera");
  if (parseInt(sessionStorage.getItem("cartasLeidas")) < 9) {
    btn.innerHTML =
      '<a href="javascript:void(0)" onclick="posicion()" class="btn" id="accion">Leer Siguiente Carta</a>';
    sessionStorage.setItem(
      "cartasLeidas",
      parseInt(sessionStorage.getItem("cartasLeidas")) + 1
    );
  } else {
    btn.innerHTML =
      '<a href="javascript:void(0)" onclick="continuar()" class="btn" id="accion">Continuar</a>';
  }
}

function continuar() {
  let btn = document.getElementById("botonera");
  btn.innerHTML = `<a href="javascript:void(0)" onclick="cartaAnterior()" class="btn" id="anterior">Anterior</a>
     <a href="../index.html" class="btn" id="salir">Salir</a>
     <a href="javascript:void(0)" onclick="cartaSiguiente()" class="btn" id="siguiente">Siguiente</a>`;
  btn = document.getElementById("salir");
  btn.style.display = "inline-block";
  Swal.fire({
    icon: "warning",
    background: "#fff url(../images/fondo-modal.png)",
    title: "Atención",
    html: `Utilice los botones "Anterior" y "Siguiente" para releer el mensaje de las cartas.<br><br>
        Haga click sobre las cartas para más información`,
  });
}

function posicionCarta() {
  let texto, thumb, lectura;
  texto = document.getElementById("posicion");
  texto.innerHTML = `<strong>${
    cartasTiradas[parseInt(sessionStorage.getItem("cartasLeidas"))].nombre
  }:</strong> ${
    posCarta[parseInt(sessionStorage.getItem("cartasLeidas"))].descripcion
  }`;
  // if (cartasTiradas[cartasLeidas].posicion) {
  //   descripcion = cartasTiradas[cartasLeidas].descVertical;
  //     }else {
  //   descripcion = cartasTiradas[cartasLeidas].descInvertida;
  // }
  // lo cambio por un operador ternario
  lectura = document.getElementById("lectura");
  thumb = document.getElementById("thumb");
  cartasTiradas[parseInt(sessionStorage.getItem("cartasLeidas"))].posicion
    ? (descripcion =
        pos[
          parseInt(
            cartasTiradas[parseInt(sessionStorage.getItem("cartasLeidas"))].id
          )
        ].posicion[parseInt(sessionStorage.getItem("cartasLeidas"))][1])
    : (descripcion =
        pos[
          parseInt(
            cartasTiradas[parseInt(sessionStorage.getItem("cartasLeidas"))].id
          )
        ].posicion[parseInt(sessionStorage.getItem("cartasLeidas"))][0]);
  cartasTiradas[parseInt(sessionStorage.getItem("cartasLeidas"))].posicion
    ? (img =
        "../images/" +
        cartasTiradas[parseInt(sessionStorage.getItem("cartasLeidas"))]
          .imgVertical)
    : (img =
        "../images/" +
        cartasTiradas[parseInt(sessionStorage.getItem("cartasLeidas"))]
          .imgInvertida);
  thumb.innerHTML = `<div class="w3-display-container w3-hover-opacity">
                         <img src= ${img} class="cartaPergamino w3-sepia" onclick="descripcionCarta(${
    cartasTiradas[parseInt(sessionStorage.getItem("cartasLeidas"))].id})" 
    alt= ${cartasTiradas[parseInt(sessionStorage.getItem("cartasLeidas"))].nombre}>
    <div class="w3-display-middle w3-display-hover">
      <p class="w3-brown w3-text-white textoCarta" onclick="descripcionCarta(${
        cartasTiradas[parseInt(sessionStorage.getItem("cartasLeidas"))].id})" >Haga click aquí para más información</p>
    </div>
  </div>`;

  lectura.innerHTML = `${descripcion}`;

  // lectura = document.getElementById("descripcion");
  // lectura.innerHTML = `${
  //   pos[parseInt(cartasTiradas[cartasLeidas].id)].descripcion
  // }`;
}

function descripcionCarta(id) {
  let clave = parseInt(id);
  let img = "../images/" + pos[clave].img;
  Swal.fire({
    title: pos[clave].nombre,
    html: `<img src= ${img} class="unacarta">
    <p class="swal2-html-container"> ${pos[clave].descripcion} </p>`,
    imageAlt: pos[clave].nombre,
    background: "#fff url(../images/fondo-modal.png)",
  });
}

function cartaSiguiente() {
  if (parseInt(sessionStorage.getItem("cartasLeidas")) < 9) {
    document.getElementById(ultimaCarta).classList.toggle("resaltada");
    sessionStorage.setItem(
      "cartasLeidas",
      parseInt(sessionStorage.getItem("cartasLeidas")) + 1
    );
    ultimaCarta =
      "card" + String(parseInt(sessionStorage.getItem("cartasLeidas")) + 1);
    document.getElementById(ultimaCarta).classList.toggle("resaltada");
    posicionCarta();
  } else {
    Swal.fire({
      icon: "error",
      background: "#fff url(../images/fondo-modal.png)",
      title: "Oops...",
      text: "No hay cartas después de esta!",
    });
  }
}

function cartaAnterior() {
  if (parseInt(sessionStorage.getItem("cartasLeidas")) > 0) {
    document.getElementById(ultimaCarta).classList.toggle("resaltada");
    sessionStorage.setItem(
      "cartasLeidas",
      parseInt(sessionStorage.getItem("cartasLeidas")) - 1
    );
    ultimaCarta =
      "card" + String(parseInt(sessionStorage.getItem("cartasLeidas")) + 1);
    document.getElementById(ultimaCarta).classList.toggle("resaltada");
    posicionCarta();
  } else {
    Swal.fire({
      icon: "error",
      background: "#fff url(../images/fondo-modal.png)",
      title: "Oops...",
      text: "No hay cartas antes de esta!",
    });
  }
}

function voltear() {
  let cartaActual;
  if (parseInt(sessionStorage.getItem("cartasLeidas")) > 0) {
    ultimaCarta =
      "card" + String(parseInt(sessionStorage.getItem("cartasLeidas")));
    cartaActual = document.getElementById(ultimaCarta);
  }
  ultimaCarta =
    "card" + String(parseInt(sessionStorage.getItem("cartasLeidas")) + 1);
  cartaActual = document.getElementById(ultimaCarta);
  cartaActual.classList.add("leyendo");
  cartaActual.classList.toggle("resaltada");
  console.log(parseInt(sessionStorage.getItem("cartasLeidas")));
}

function load() {
  cargarCartas();
}

window.addEventListener("load", load);
