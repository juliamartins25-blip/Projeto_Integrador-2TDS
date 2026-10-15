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

// formulario comentario
const formComentarios = document.querySelector("#form-comentarios");
const btnEnviarComentario = document.querySelector("#btn-enviar-comentario");

const comentario = document.querySelector("#comentario");

formComentarios.addEventListener("submit", function(evento){
    evento.preventDefault();
});

btnEnviarComentario.addEventListener("click", function(){
    comentarios.push(comentario);
});

// formulario de relatos
const formRelatos = document.querySelector("#form-relatos");
const btnEnviarRelato = document.querySelector("#btn-enviar-relato");

const resumo = document.querySelector("#resumo");
const formato = document.querySelector("#formato");
const tema = document.querySelector("#tema");
const ondeRecebeu = document.querySelector("#onde-recebeu");
const quemCompartilhou = document.querySelector("#quem-compartilhou");
const data = document.querySelector("#data");
const comoDescobriu = document.querySelector("#como-descobriu");
const compartilhou = document.querySelector("#compartilhou");
const impacto = document.querySelector("#impacto");

formRelatos.addEventListener("submit", function(evento){
    evento.preventDefault();
});

btnEnviarRelato.addEventListener("click", function(){
    console.log(resumo.value);
    console.log(formato.value);
    console.log(tema.value);
    console.log(ondeRecebeu.value);
    console.log(quemCompartilhou.value);
    console.log(data.value);
    console.log(comoDescobriu.value);
    console.log(compartilhou.value);
    console.log(impacto.value);


});

    // dados validados OK
    // colocar o resultado em uma lista
    // fazer os dados aparecerem em comentarios

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
    console.log(organizado.value);
    console.log(acessibilidade.value);
    console.log(recomendaria.value);
    console.log(atencao.value);
    console.log(sugestao.value);
});

// dados validados. proximo passoa agora
