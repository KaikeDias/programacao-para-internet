const textBox = document.getElementById('textBox')
const btnAdicionar = document.getElementById('btnAdicionar')
const selectOpcoes = document.getElementById('selectOpcoes')
const btnRemover = document.getElementById('btnRemover')


btnAdicionar.addEventListener('click', () => {
  const option = textBox.value.trim()

  if(option === ''){
    alert('Digite uma opcao valida')
    return
  }

  const opcoesExistentes = Array.from(selectOpcoes.options).map(opt => opt.value.toLowerCase())

  if (opcoesExistentes.includes(option.toLowerCase())) {
    alert('Opção já existente')
    return
  }

  if (selectOpcoes.options.length >= 5) {
    alert('Limite maximo de opcoes atingido')
    return
  }

  const newOption = document.createElement('option')
  newOption.value = option
  newOption.text = option
  selectOpcoes.appendChild(newOption)
  textBox.value = ''
})

btnRemover.addEventListener('click', () => {
  const selectedOptions = selectOpcoes.selectedOptions
  if (selectedOptions.length > 0) {
    selectOpcoes.removeChild(selectedOptions[0])
  }
})
