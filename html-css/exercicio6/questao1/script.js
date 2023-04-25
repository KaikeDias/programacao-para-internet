document.addEventListener('DOMContentLoaded', function () {
        var botaoExibir = document.getElementById('botaoExibir');
        botaoExibir.addEventListener('click', exibirConteudo);
    }
);

function exibirConteudo() {
    var conteudo = document.getElementById('caixaDeTexto').value;

    if(conteudo != '') {
        document.getElementById('conteudo').innerHTML = conteudo;
    }else{
        alert("Preencha o campo de texto")
    }
    
}