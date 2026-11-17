const SUPABASE_URL = 'https://qniyiiwmqrljbsjhsfhc.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFuaXlpaXdtcXJsamJzamhzZmhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQzMTE2MTgsImV4cCI6MjEwOTg4NzYxOH0.-07aCDK3nNWn6_Aj1jiAnZtNTePzmQsLPqWT4PdKn3U';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// --> comentarios
//salva o comentario no banco
async function salvarComentarioNoBanco(texto) {
  const { error } = await supabaseClient
    .from('comentarios')
    .insert([{ mensagem: texto }]);

  if (error) {
    console.error('Erro ao salvar comentário:', error.message);
    return false;
  }
  return true;
}

// Busca todos os comentários já salvos no Supabase
async function buscarComentariosDoBanco() {
  const { data, error } = await supabaseClient
    .from('comentarios')
    .select('mensagem')
    .order('id', { ascending: false });

  if (error) {
    console.error('Erro ao buscar comentários:', error.message);
    return [];
  }
  return data;
}

// --> enquete
//*enquete acreditou
async function salvarVotoAcreditou(resposta){
  const { error } = await supabaseClient
  .from('enquete_acreditou')
  .insert([{opcao_escolhida: resposta}]);

  if(error) {
    console.error('Erro ao salvar voto (acreditou):', error.mensage);
    return false;
  }
  return true;
}

async function buscarVotosAcreditou() {
  const {data, error} = await supabaseClient
  .from('enquete_acreditou')
  .select('opcao_escolhida');

  if(error) {
    console.error('Erro ao buscar votos (acreditou):', error.mensage);
    return [];
  }
  return data;
}

//*enquete tema
async function salvarVotoTema(tema) {
  const {error} = await supabaseClient
  .from('enquete_tema')
  .insert([{opcao_escolhida: tema}]);

  if (error) {
    console.error('Erro ao salvar voto (tema):', error.mensage);
    return false;
  }
  return true;
}

async function buscarVotosTema() {
  const {data, error} = await supabaseClient
  .from('enquete_tema')
  .select('opcao_escolhida');

  if (error){
    console.error('Error ao buscar votos (tema):', error.mensage);
    return [];
  }
  return data;
}

// --> formulario de avaliação
async function salvarAvaliacaoNoBanco(estrelas, texto) {
  const {error} = await supabaseClient
  .from('avaliacao')
  .insert([{estrelas: estrelas, mensagem: texto}]);

  if (error) {
    console.error('Erro ao salvar avaliação:', error.mensage);
    return false;
  }
  return true;
}

async function buscarAvaliacoes() {
  const {data, error} = await supabaseClient
  .from('avaliacao')
  .select('estrelas, mensagem')
  .order('id', { ascending: false });

  if (error) {
    console.error('Erro ao buscar avaliações:', error.mensage);
    return [];
  }
  return data;
}