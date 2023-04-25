document.addEventListener('DOMContentLoaded', function () {
        const btnSomar = document.getElementById('btnSomar');
        btnSomar.addEventListener('click', somar);
    }
);

function somar() {
    const numero1 = Number(document.getElementById('numero1').value);
    const numero2 = Number(document.getElementById('numero2').value)

    if(!isNaN(numero1) && !isNaN(numero2)) {
        const soma = numero1 + numero2
        document.getElementById('soma').innerHTML = soma
    } else {
        alert("valor digitado nao é um numero")
    }
    
}