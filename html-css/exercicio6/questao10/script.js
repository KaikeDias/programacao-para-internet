const select1 = document.getElementById('select1');
const select2 = document.getElementById('select2');
const btnTransferirDireita = document.getElementById('btnTransferirDireita');
const btnTransferirEsquerda = document.getElementById('btnTransferirEsquerda');

btnTransferirDireita.addEventListener('click', () => {
  for (let option of select1.selectedOptions) {
    const newOption = document.createElement('option');
    newOption.value = option.value;
    newOption.text = option.text;
    select2.appendChild(newOption);
    select1.removeChild(option);
  }
});

btnTransferirEsquerda.addEventListener('click', () => {
  for (let option of select2.selectedOptions) {
    const newOption = document.createElement('option');
    newOption.value = option.value;
    newOption.text = option.text;
    select1.appendChild(newOption);
    select2.removeChild(option);
  }
});