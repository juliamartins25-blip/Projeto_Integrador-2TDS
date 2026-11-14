const SUPABASE_URL = 'https://qniyiiwmqrljbsjhsfhc.supabase.co/rest/v1/';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFuaXlpaXdtcXJsamJzamhzZmhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQzMTE2MTgsImV4cCI6MjEwOTg4NzYxOH0.-07aCDK3nNWn6_Aj1jiAnZtNTePzmQsLPqWT4PdKn3U';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

//Salvar um voto na enquete
async function salvarVoto (opcao) {
    const{data, error} = await supabaseClient
        .from('enquete_acreditou')
        .insert([{ opcao_escolhida: opcao}]);

    if (error) {
        console.error('erro ao votar:', error.mensage);
    } else {
        alert("Voto registrado com sucesso!");
    }
}

// ler e exibir comentario
async function enviarComentario(texto) {
  const { data, error } = await supabaseClient
    .from('comentarios')
    .insert([{mensagem: texto }]);

  if (error) {
    console.error('Erro ao enviar comentário:', error.message);
  } else {
    alert('Comentário enviado!');
  }
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