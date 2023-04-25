const imagemSelect = document.getElementById('imagemSelect');
const resultado = document.getElementById('resultado');

imagemSelect.addEventListener('change', () => {
  if (imagemSelect.value === '') {
    resultado.innerHTML = '';
    return;
  }

  const img = document.createElement('img');
  img.src = imagemSelect.value;
  resultado.innerHTML = '';
  resultado.appendChild(img);
});