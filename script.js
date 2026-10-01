// voltar ao topo
const botao_voltar = document.querySelector("#btn-topo");

function voltarAoTopo() {
    window.scrollTo ({
        top: 0,
        behavior: 'smooth'
    })
}

botao_voltar.addEventListener("click", function() {
    voltarAoTopo();
})

    // mostrar botao
window.onscroll = function() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200){
        botao_voltar.style.display = "block";
    } else {
        botao_voltar.style.display = "none";
    }
};

// formulario de avaliação
const formAvaliação = document.querySelector("#formulario_avaliacao");
const btnEnviar = document.querySelector("#btn-enviar");

const clareza = document.querySelector("#clareza");
const utilidade = document.querySelector("#utilidade");
const facilidade = document.querySelector("#facilidade");
const organizado = document.querySelector("#organizado");
const acessibilidade = document.querySelector("#acessibilidade");
const recomendaria = document.querySelector("#recomendaria");
const atencao = document.querySelector("#atencao");
const sugestao = document.querySelector("#sugestao");

formAvaliação.addEventListener("submit", function(evento){
    evento.preventDefault();

    console.log("formulario recebido");
})

btnEnviar.addEventListener("click", function(){
    console.log(clareza.value);
    console.log(utilidade.value);
    console.log(facilidade.value);
    console.log(organizada.value);
    console.log(acessibilidade.value);
    console.log(recomendaria.value);
    console.log(atencao.value);
    console.log(sugestao.value);
});

// dados validados. proximo passoa agora