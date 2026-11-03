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
const formComentario = document.querySelector("#form-comentarios");
const espacoComentario = document.querySelector("#espaco-para-comentarios");

formComentario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    console.log("recebido");

    const comentario = document.querySelector("#comentario").value;

    const novoComentario = document.createElement('div');
    novoComentario.style.border = "1px solid #ccc";
    novoComentario.style.borderRadius = "5px";
    novoComentario.style.padding = "10px";
    novoComentario.style.marginBottom = "10px";

    novoComentario.innerHTML = `<p>${comentario}</p>`;

    espacoComentario.appendChild(novoComentario);
    formComentario.reset();

    const mensagem = document.querySelector("#mensagem");
    mensagem.textContent = "";
});

    //ver resultado ao clicar no botao ver mais

const verComentario = document.querySelector("#ver-comentario");
verComentario.addEventListener("click", function( ){
    espacoComentario.classList.toggle("ver-espaco");
    verComentario.classList.toggle("ver-ligado");
})