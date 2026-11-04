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
});

// formulario de relatos
    //já caiu em uma fake news?
let totalSim = 0;
let totalNao = 0;
let totalVotacao = 0;

function atualizarGrafico(){
    const total = totalSim + totalNao;

    //calculo da porcentagem
    const pctSim = (totalSim / total) * 100;
    const pctNao = (totalNao / total) * 100;

    //atualização da largura das fatias
    document.querySelector("#fatia-sim").style.width = pctSim + '%';
    document.querySelector("#fatia-nao").style.width = pctNao + '%';

    document.querySelector("#porcentagem-sim").textContent = Math.round(pctSim) + '%';
    document.querySelector("#porcentagem-nao").textContent = Math.round(pctNao) + '%';

    //mostrar total de votos
    document.querySelector("#total-votos").textContent = `${totalVotacao}`;
}

const formAcreditou = document.querySelector("#form-acreditou");

formAcreditou.addEventListener("submit", function(evento) {
    evento.preventDefault();

    totalVotacao++;
    const acreditou = document.querySelector("#acreditou").value;

    if (acreditou === 'sim') {
        totalSim++;
    } else if (acreditou === 'nao') {
        totalNao++;
    }

    atualizarGrafico();
    formAcreditou.reset();
})

    // qual foi o tema?
let totalSaude = 0;
let totalPolitica = 0;
let totalCiencia = 0;
let totalCelebridades = 0;
let totalSeguranca = 0;
let totalEconomia = 0;
let totalOutro = 0;

let totalVotacaoTema = 0;

function atualizarGraficoTema (){
    const total = totalSaude + totalPolitica + totalCiencia + totalCelebridades + totalSeguranca + totalEconomia + totalOutro;

    // calculo porcentagem
    const pctSaude = (totalSaude / total) * 100;
    const pctPolitica = (totalPolitica / total) * 100;
    const pctCiencia = (totalCiencia / total) * 100;
    const pctCelebridades = (totalCelebridades / total) * 100;
    const pctSeguranca = (totalSeguranca / total) * 100;
    const pctEconomia = (totalEconomia / total) * 100;
    const pctOutro = (totalOutro / total) * 100;

    //atualização das fatias
    document.querySelector("#fatia-saude").style.width = pctSaude + '%';
    document.querySelector("#fatia-politica").style.width = pctPolitica + '%';
    document.querySelector("#fatia-ciencia").style.width = pctCiencia + '%';
    document.querySelector("#fatia-celebridades").style.width = pctCelebridades + '%';
    document.querySelector("#fatia-seguranca").style.width = pctSeguranca + '%';
    document.querySelector("#fatia-economia").style.width = pctEconomia + '%';
    document.querySelector("#fatia-outro").style.width = pctOutro + '%';

    document.querySelector("#porcentagem-saude").textContent = Math.round(pctSaude) + '%';
    document.querySelector("#porcentagem-politica").textContent = Math.round(pctPolitica) + '%';
    document.querySelector("#porcentagem-ciencia").textContent = Math.round(pctCiencia) + '%';
    document.querySelector("#porcentagem-celebridades").textContent = Math.round(pctCelebridades) + '%';
    document.querySelector("#porcentagem-seguranca").textContent = Math.round(pctSeguranca) + '%';
    document.querySelector("#porcentagem-economia").textContent = Math.round(pctEconomia) + '%';
    document.querySelector("#porcentagem-outro").textContent = Math.round(pctOutro) + '%';

    //mostrar total de votos
    document.querySelector("#total-votos-tema").textContent = `${totalVotacaoTema}`;
}

const formTema = document.querySelector("#form-tema");

formTema.addEventListener("submit", function(evento){
    evento.preventDefault();

    totalVotacaoTema++;
    const tema = document.querySelector("#tema").value;

    if (tema === 'saude') {
        totalSaude++;
    } else if (tema === 'politica') {
        totalPolitica++;
    } else if (tema === 'ciencia') {
        totalCiencia++;
    } else if (tema === 'celebridade') {
        totalCelebridades++;
    } else if(tema === 'seguranca') {
        totalSeguranca++;
    } else if (tema === 'economia') {
        totalEconomia++;
    } else if (tema === 'outro') {
        totalOutro++;
    };

    atualizarGraficoTema();
    formTema.reset();
});

// formulario de avaliação
const formAvaliacao = document.querySelector("#formulario-avaliacao");
const espacoAvaliacao = document.querySelector("#espaco-avaliacoes");

formAvaliacao.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const estrelas = document.querySelector("#estrelas").value;
    const texto = document.querySelector("#texto-avaliacao").value;

    const novaAvaliacao = document.createElement('div');
    novaAvaliacao.innerHTML = `
        <p>${estrelas} estrelas.</p>
        <p>${texto}</p>
    `;

    novaAvaliacao.style.border = "1px solid #ccc";
    novaAvaliacao.style.borderRadius = "8px";
    novaAvaliacao.style.padding = "20px";
    novaAvaliacao.style.marginBottom = "10px";

    espacoAvaliacao.appendChild(novaAvaliacao);
    formAvaliacao.reset();

    const mensagem = document.querySelector("#mensagem2");
    mensagem.textContent = "";
});

const btnVer = document.querySelector("#ver");
btnVer.addEventListener("click", function(){
    espacoAvaliacao.classList.toggle("ver-espaco");
    btnVer.classList.toggle("ver-ligado");
});