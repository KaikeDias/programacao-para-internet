function validarOpcoes() {
    const opcoes = document.getElementsByName('opcao');
    let isCheked = false;
    
    for (let i = 0; i < opcoes.length; i++) {
      if (opcoes[i].checked) {
        isCheked = true;
        break;
      }
    }
    
    if (isCheked) {
      alert('Pelo menos uma opção foi selecionada!');
    } else {
      alert('Selecione pelo menos uma opção!');
    }
  }
  