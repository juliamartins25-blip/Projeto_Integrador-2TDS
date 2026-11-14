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

    const comentario = document.querySelector("#comentario").value;
 
    enviarComentario(comentario);

    //cria elemento no espaço
    const novoComentario = document.createElement('div');
    novoComentario.style.border = "1px solid #ccc";
    novoComentario.style.borderRadius = "5px";
    novoComentario.style.padding = "10px";
    novoComentario.style.marginBottom = "10px";

    const paragrafo = document.createElement('p');
    paragrafo.textContent = comentario;
    novoComentario.appendChild(paragrafo);

    espacoComentario.appendChild(novoComentario);
    formComentario.reset();

    //mensagem concluido
    const mensagemConcluido = document.querySelector("#mensagem-sucesso-c");
    mensagemConcluido.classList.add("ativo");
    setTimeout(function() {mensagemConcluido.classList.remove("ativo");}, 3000);

    //remove mensagem de espera
    const mensagem = document.querySelector("#mensagem");
    mensagem.textContent = "";
});

    //ver resultado ao clicar no botao ver mais
const verComentario = document.querySelector("#ver-comentario");

verComentario.addEventListener("click", function( ){
    buscarComentariosDoBanco();

    espacoComentario.classList.toggle("ver-espaco");
    verComentario.classList.toggle("ver-ligado");
});

// formulario de relatos
    //já caiu em uma fake news?
let totalSim = 0;
let totalNao = 0;
let totalVotacao = 0;

//função que gera grafico
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
//atualiza grafico com resposta
const formAcreditou = document.querySelector("#form-acreditou");

formAcreditou.addEventListener("submit", function(evento) {
    evento.preventDefault();
    totalVotacao++;
    const acreditou = document.querySelector("#acreditou").value;
    //verificação: sim ou não
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
//cria grafico
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
//atualiza grafico com resposta
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
    //marcar estrela
const estrelas = document.querySelectorAll(".estrela");
let notaSelecionada = 0;

estrelas.forEach(function(estrela) {
    estrela.addEventListener("click", function(){
        notaSelecionada = Number(estrela.getAttribute("data-valor"));

        estrelas.forEach(function(item){
            const valorItem = Number(item.getAttribute("data-valor"));

            if (valorItem <= notaSelecionada) {
                item.classList.add("ativa");
            } else {
                item.classList.remove("ativa");
            }
        });
    });
});

    // verifica o clic no botão enviar
const btnEnviar = document.querySelector("#btn-enviar");
const espacoAvaliacao = document.querySelector("#espaco-avaliacoes");

btnEnviar.addEventListener("click", function() {
    const textoAvaliacao = document.querySelector("#texto-avaliacao").value;

    // verifica se está vazio
    const mensagemErro = document.querySelector("#mensagem-erro");
    if (textoAvaliacao === "" || notaSelecionada === 0) {
        mensagemErro.classList.add("mensagem-erro-ativa");
        setTimeout(function(){mensagemErro.classList.remove("mensagem-erro-ativa");}, 3000);
        return;
    } else {
        mensagemErro.classList.remove("mensagem-erro-ativa");
    };
    
    //insere a resposta no espaço
    const novaAvaliacao = document.createElement('div');
    novaAvaliacao.innerHTML = `
        <p>Nota: ${notaSelecionada}</p>
        <p>${textoAvaliacao}</p>
    `;

    novaAvaliacao.style.border = "1px solid #ccc";
    novaAvaliacao.style.borderRadius = "8px";
    novaAvaliacao.style.padding = "20px";
    novaAvaliacao.style.marginBottom = "10px";

    espacoAvaliacao.appendChild(novaAvaliacao);

    //reseta o formulario
    document.querySelector("#texto-avaliacao").value = "";
    notaSelecionada = 0;
    estrelas.forEach(function(item) {
        item.classList.remove("ativa");
    })
    
    // mensagem de concluido
    const mensagemConcluido = document.querySelector("#mensagem-sucesso-a");
    mensagemConcluido.classList.add("ativo");
    setTimeout(function() {mensagemConcluido.classList.remove("ativo");}, 3000);

    // remove mensagem de espera
    const mensagem = document.querySelector("#mensagem2");
    mensagem.textContent = "";
});

    // botão ver mais
const btnVer = document.querySelector("#ver");
btnVer.addEventListener("click", function(){
    espacoAvaliacao.classList.toggle("ver-espaco");
    btnVer.classList.toggle("ver-ligado");
});