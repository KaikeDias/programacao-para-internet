function converterTexto(texto, opcao) {
    if (opcao === 'maiusculo') {
      return texto.toUpperCase()
    } else if (opcao === 'minusculo') {
      return texto.toLowerCase()
    } else {
      return texto
    }
  }

  const selectOpcao = document.getElementById('selectOpcao')
  const textBox = document.getElementById('textBox');
  const btnConverter = document.getElementById('btnConverter');
  const resultado = document.getElementById('resultado');
  
  btnConverter.addEventListener('click', () => {
    const opcao = selectOpcao.value
    const texto = textBox.value
    const textoConvertido = converterTexto(texto, opcao)
    resultado.innerHTML = textoConvertido

  })