const textBox = document.getElementById('textBox');
const btnAdicionar = document.getElementById('btnAdicionar');
const selectOpcoes = document.getElementById('selectOpcoes');

btnAdicionar.addEventListener('click', () => {
  const texto = textBox.value;
  const option = document.createElement('option');
  option.text = texto;
  selectOpcoes.appendChild(option);
  textBox.value = '';
});
