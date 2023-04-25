const textBox = document.getElementById('textBox');
const btnExibir = document.getElementById('btnExibir');
const resultado = document.getElementById('resultado');

btnExibir.addEventListener('click', () => {
  const img = document.createElement('img');
  img.src = "images/" + textBox.value;
  resultado.appendChild(img);
});
