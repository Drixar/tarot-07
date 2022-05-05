let slideIndex = 1;
let t = setInterval(function () {
  plusDivs(1);
}, 5000);

showDivs(slideIndex);
function changeState(el) {
  var text = '';
  if (!t) {
    t = setInterval(function () {
      plusDivs(1);
    }, 5000);
    text = 'PAUSE ||';
  } else {
    clearInterval(t);
    t = false;
    text = 'PLAY';
  }
  el.innerText= text;
}

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function currentDiv(n) {
  showDivs(slideIndex = n);
}

function showDivs(n) {
  let x = document.getElementsByClassName("mySlides");
  if (n > x.length) {
    slideIndex = 1
  }
  if (n < 1) {
    slideIndex = x.length
  }
  for (let i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndex - 1].style.display = "block";
}

