function unaCarta() {
  let tmp = cartas[cartas.length - 1];
  let id, img, descripcion;
  // if (cartas.length - 1 < 10) {
  //   id = "carta0" + String(cartas.length - 1);
  // } else {
  //   id = "carta" + String(cartas.length - 1);
  // }
  // lo cambio por un operador ternario y rezo...
  cartas.length - 1 < 10
    ? (id = "carta0" + String(cartas.length - 1))
    : (id = "carta" + String(cartas.length - 1));
  let elemento = document.getElementById(id);
  elemento.remove();
  cartas.pop();
  if (parseInt(sessionStorage.getItem('cartasLeidas')) == 0) {
    let btn = document.getElementById("salir");
    btn.style.display = "inline-block";
  }
  let repartir = document.getElementById("card00");
  // agregada la funcionalidad de detectar
  // si la carta esta invertida
  if (tmp.posicion) {
    img = "../images/" + tmp.imgVertical;
    descripcion = tmp.descVertical;
  } else {
    img = "../images/" + tmp.imgInvertida;
    descripcion = tmp.descInvertida;
  }
  repartir.innerHTML =
    "<img src=" + img + ' class="unacarta" alt=' + tmp.nombre + '") >';
  let lectura = document.getElementById("interpretacion");
  lectura.innerHTML = `${descripcion}`;
  if (cartas.length == 0) {
    let btn = document.getElementById("sacar");
    btn.style.display = "none";
  }
}

function load() {
  cargarCartas();
}

window.addEventListener("load", load);
