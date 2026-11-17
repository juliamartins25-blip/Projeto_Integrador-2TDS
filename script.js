// --> voltar ao topo
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

// --> formulario comentario
const formComentario = document.querySelector("#form-comentarios");
const espacoComentario = document.querySelector("#espaco-para-comentarios");
const mensagemEspera = document.querySelector("#mensagem");

    //função para criar um card de comentario
function criarCardComentario(texto){
    const novoComentario = document.createElement('div');
    novoComentario.style.border = "1px solid #ccc";
    novoComentario.style.borderRadius = "5px";
    novoComentario.style.padding = "10px";
    novoComentario.style.marginBottom = "10px";

    const paragrafo = document.createElement('p');
    paragrafo.textContent = texto;
    novoComentario.appendChild(paragrafo);

    return novoComentario;
}

    // carrega os comentario do banco
async function carregarComentarios(){
    const listaComentarios = await buscarComentariosDoBanco();

    if (listaComentarios.length > 0) {
        if (mensagemEspera) mensagemEspera.style.display = "none";

        espacoComentario.querySelectorAll('div').forEach(div => div.remove());

        listaComentarios.forEach(item => {
            const card = criarCardComentario(item.mensagem);
            espacoComentario.appendChild(card);
        });
    }
}

    // envia formulario
formComentario.addEventListener("submit", async function(evento){
    evento.preventDefault();

    const comentario = document.querySelector("#comentario").value.trim();
    if (!comentario) return;

    //salva no supabase
    const salvou = await salvarComentarioNoBanco(comentario);

    if (!salvou) {
        alert("Não foi possível enviar o comentário. Verifique sua conexão.");
        return;
    }

    //cria um elemento no espaço
    const novoComentario = criarCardComentario(comentario);
    espacoComentario.prepend(novoComentario);

    formComentario.reset();

    //mensagem comcluido
    const mensagemConcluido = document.querySelector("#mensagem-sucesso-c");
    mensagemConcluido.classList.add("ativo");
    setTimeout(function() {
        mensagemConcluido.classList.remove("ativo");
    }, 3000);

    //esconde mensagem de espera
    if (mensagemEspera) {
        mensagemEspera.style.display = "none";
    }

});

    //ver resultado ao clicar no botao ver mais
const verComentario = document.querySelector("#ver-comentario");

verComentario.addEventListener("click", function( ){
    espacoComentario.classList.toggle("ver-espaco");
    verComentario.classList.toggle("ver-ligado");
});

    // Executa o carregamento inicial
carregarComentarios();


// --> formulario de relatos
    //já caiu em uma fake news?
let totalSim = 0;
let totalNao = 0;
let totalVotacao = 0;

//função que gera grafico
function atualizarGrafico(){
    const total = totalSim + totalNao;
    if (total === 0) return;

    //calculo da porcentagem
    const pctSim = (totalSim / total) * 100;
    const pctNao = (totalNao / total) * 100;

    //atualização da largura das fatias
    document.querySelector("#fatia-sim").style.width = pctSim + '%';
    document.querySelector("#fatia-nao").style.width = pctNao + '%';
    document.querySelector("#porcentagem-sim").textContent = Math.round(pctSim) + '%';
    document.querySelector("#porcentagem-nao").textContent = Math.round(pctNao) + '%';
    document.querySelector("#total-votos").textContent = `${totalVotacao}`;
}

// busca todo os votos
async function carregarDadosAcreditou() {
    const votos = await buscarVotosAcreditou();

    //zera os contadores
    totalSim = 0;
    totalNao = 0;
    totalVotacao = votos.length;

    votos.forEach(item => {
        if (item.opcao_escolhida === 'sim') {
            totalSim++;
        } else if (item.opcao_escolhida === 'nao') {
            totalNao++;
        }
    });

    atualizarGrafico();
}

//atualiza grafico com resposta
const formAcreditou = document.querySelector("#form-acreditou");

if (formAcreditou){
    formAcreditou.addEventListener("submit", async function(evento) {
        evento.preventDefault();

        const acreditou = document.querySelector("#acreditou").value;
        if (!acreditou) return;

        //salvar no supabase
        const salvou = await salvarVotoAcreditou(acreditou);
        if(!salvou) {
            alert("Erro ao registrar seu voto. Tente novamente.");
            return;
        }

        //carrega dados
        await carregarDadosAcreditou();
        formAcreditou.reset();
    });

    carregarDadosAcreditou();
}

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
    if (total === 0) return;

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

// busca todos os votos de tema
async function carregaDadosTema() {
    const votos = await buscarVotosTema();
    
    //zera contadores
    totalSaude = 0;
    totalPolitica = 0;
    totalCiencia = 0;
    totalCelebridades = 0;
    totalSeguranca = 0;
    totalEconomia = 0;
    totalOutro = 0;
    totalVotacaoTema = votos.length;

    votos.forEach(item => {
        if(item.opcao_escolhida === 'saude') totalSaude++;
        else if(item.opcao_escolhida === 'politica') totalPolitica++;
        else if(item.opcao_escolhida === 'ciencia') totalCiencia++;
        else if(item.opcao_escolhida === 'celebridade') totalCelebridades++;
        else if(item.opcao_escolhida === 'seguranca') totalSeguranca++;
        else if(item.opcao_escolhida === 'economia') totalEconomia++;
        else if(item.opcao_escolhida === 'outro') totalOutro++;
    });

    atualizarGraficoTema();
}
//atualiza grafico com resposta
const formTema = document.querySelector("#form-tema");
if (formTema) {
    formTema.addEventListener("submit", async function(evento){
        evento.preventDefault();

        totalVotacaoTema++;
        const tema = document.querySelector("#tema").value;
        if (!tema) return;

        //salva no supabase
        const salvou = await salvarVotoTema(tema);
        if(!salvou) {
            alert("Erro ao registra o tema. Tente novamenete.");
            return;
        }

        //recarrega os dados
        await carregaDadosTema();
        formTema.reset();
    });

    carregaDadosTema();
}

// --> formulario de avaliação
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

const btnEnviar = document.querySelector("#btn-enviar");
const espacoAvaliacao = document.querySelector("#espaco-avaliacoes");
const mensagemEsperaAv = document.querySelector("#mensagem2");

// desenhar card
function criarCardAvaliacao(nota, texto) {
    const novaAvaliacao = document.createElement('div');
    novaAvaliacao.style.border = "1px solid #ccc";
    novaAvaliacao.style.borderRadius = "8px";
    novaAvaliacao.style.padding = "20px";
    novaAvaliacao.style.marginBottom = "10px";

    const pNota = document.createElement('p');
    pNota.textContent = `Nota: ${nota}`;

    const pTexto = document.createElement('p');
    pTexto.textContent = texto;

    novaAvaliacao.appendChild(pNota);
    novaAvaliacao.appendChild(pTexto);

    return novaAvaliacao;
}

async function carregarAvaliacoes() {
    const listaAvaliacoes = await buscarAvaliacoes();

    if (listaAvaliacoes.length > 0) {
        if(mensagemEsperaAv) mensagemEsperaAv.style.display = 'none';

        espacoAvaliacao.querySelectorAll('div').forEach(div => div.remove());

        listaAvaliacoes.forEach(item => {
            const card = criarCardAvaliacao(item.estrelas, item.mensagem);
            espacoAvaliacao.appendChild(card);
        });
    }
}

    // verifica o click no botão enviar
btnEnviar.addEventListener("click", async function() {
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

    //salvar no supabase
    const salvou = await salvarAvaliacaoNoBanco(notaSelecionada, textoAvaliacao);
    if (!salvou) {
        alert("Erro ao enviar avaliação. Verifique sua conexão.");
        return;
    }

    //inserir resposta no topo da lista
    const novaAvaliacao = criarCardAvaliacao(notaSelecionada, textoAvaliacao);
    espacoAvaliacao.prepend(novaAvaliacao);

    //reseta frmulario
    document.querySelector("#texto-avaliacao").value = "";
    notaSelecionada = 0;
    estrelas.forEach(function(item) {
        item.classList.remove("ativa");
    });

    // mensagem de concluido
    const mensagemConcluido = document.querySelector("#mensagem-sucesso-a");
    mensagemConcluido.classList.add("ativo");
    setTimeout(function() {
        mensagemConcluido.classList.remove("ativo");
    }, 3000);

    //esconde mensagem de espera
    if(mensagemEsperaAv) {
        mensagemEsperaAv.style.display = 'none';
    }
    //carrega avaliações
    carregarAvaliacoes();
});


// botão ver mais
const btnVer = document.querySelector("#ver");
btnVer.addEventListener("click", function(){
    espacoAvaliacao.classList.toggle("ver-espaco");
    btnVer.classList.toggle("ver-ligado");
});