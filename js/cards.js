const cargarCartas = async () => {
  sessionStorage.setItem("cartasLeidas", 0);
  leyendo = true;
  try {
    let pos1, pos2, tmp;
    let card, img, id;
    const respuesta = await fetch("../data/cards.JSON");
    // Si la respuesta es correcta
    if (respuesta.status === 200) {
      datos = await respuesta.json();
      datos.forEach((element) => {
        // cargamos la información del archivo JSON en el array cartas
        cartas.push(element);
      });

      // Para estar seguros que están bien mezcladas...
      for (let i = 0; i < 1000; i++) {
        pos1 = Math.floor(Math.random() * cartas.length);
        pos2 = Math.floor(Math.random() * cartas.length);
        tmp = cartas[pos1];
        cartas[pos1] = cartas[pos2];
        cartas[pos2] = tmp;
      }
      // Definimos si la carta está invertida o no
      for (let i = 0; i < cartas.length; i++) {
        if (Math.round(Math.random()) == 0) {
          cartas[i].posicion = false;
        }
      }
      // desplegamos el mazo en pantalla
      document.getElementById("deck").innerHTML = "";
      for (let i = 0; i < cartas.length; i++) {
        // if (i < 10) {
        //   id = "0" + String(i);
        // } else {
        //   id = String(i);
        // }
        i < 10 ? (id = "0" + String(i)) : (id = String(i));
        card = document.createElement("div");
        img = "../images/reverso.jpg";
        card.innerHTML = `<img src= ${img} alt = "Reverso de una Carta") >`;
        card.classList.add("card");
        card.id = "carta" + id;
        document.getElementById("deck").appendChild(card);
      }
    } else if (respuesta.status === 401) {
      console.log("Error de Acceso");
    } else if (respuesta.status === 404) {
      console.log("La carta que buscas no existe");
    } else {
      console.log("Hubo un error y no sabemos que paso");
    }
  } catch (error) {
    console.log(error);
  }
};

const cargarPos = async () => {
  try {
    const respuesta = await fetch("../data/pos.JSON");
    // Si la respuesta es correcta
    if (respuesta.status === 200) {
      datos = await respuesta.json();
      datos.forEach((element) => {
        // cargamos la información del archivo JSON en el array pos
        pos.push(element);
      });
    } else if (respuesta.status === 401) {
      console.log("Error de Acceso");
    } else if (respuesta.status === 404) {
      console.log("La carta que buscas no existe");
    } else {
      console.log("Hubo un error y no sabemos que paso");
    }
  } catch (error) {
    console.log(error);
  }
};

