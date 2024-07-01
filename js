// Seleciona o container do calendário
const calendarioContainer = document.getElementById('calendario-container');

// Função para criar o calendário
function criarCalendario() {
    const hoje = new Date();
    const anoAtual = hoje.getFullYear();
    const mesAtual = hoje.getMonth();

    // Cria a tabela do calendário
    const calendario = document.createElement('table');
    calendarioContainer.appendChild(calendario);

    // Cria a linha com o nome do mês e o ano
    const linhaMes = document.createElement('tr');
    const celulaMes = document.createElement('th');
    celulaMes.colSpan = 7; // Define a célula para ocupar todas as colunas
    celulaMes.textContent = `${mesNome(mesAtual)} ${anoAtual}`;
    linhaMes.appendChild(celulaMes);
    calendario.appendChild(linhaMes);

    // Cria a linha com os dias da semana
    const linhaDias = document.createElement('tr');
    const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
    diasSemana.forEach(dia => {
        const celulaDia = document.createElement('th');
        celulaDia.textContent = dia;
        linhaDias.appendChild(celulaDia);
    });
    calendario.appendChild(linhaDias);

    // Cria as células dos dias do mês
    const diasDoMes = obterDiasDoMes(anoAtual, mesAtual);
    let diaAtual = 1;
    for (let i = 0; i < 6; i++) { // 6 linhas no máximo
        const linha = document.createElement('tr');
        for (let j = 0; j < 7; j++) { // 7 colunas
            const celula = document.createElement('td');
            if (i === 0 && j < diasDoMes[0]) {
                // Preenche os dias do mês anterior
                celula.textContent = diasDoMes[0] - j;
                celula.classList.add('dia-outro-mes');
            } else if (diaAtual <= diasDoMes[1]) {
                // Preenche os dias do mês atual
                celula.textContent = diaAtual;
                celula.classList.add('dia');
                if (diaAtual === hoje.getDate() && mesAtual === hoje.getMonth() && anoAtual === hoje.getFullYear()) {
                    celula.classList.add('dia-hoje'); // Marca o dia de hoje
                }
                diaAtual++;
            } else {
                // Preenche os dias do mês seguinte
                celula.textContent = j + 1;
                celula.classList.add('dia-outro-mes');
            }
            linha.appendChild(celula);
        }
        calendario.appendChild(linha);
    }
}

// Função para obter o nome do mês
function mesNome(mes) {
    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    return meses[mes];
}

// Função para obter os dias do mês
function obterDiasDoMes(ano, mes) {
    const ultimoDiaDoMes = new Date(ano, mes + 1, 0).getDate();
    const primeiroDiaDoMes = new Date(ano, mes, 1).getDay();
    return [primeiroDiaDoMes, ultimoDiaDoMes];
}

// Cria o calendário quando a página carregar
criarCalendario();

// Seleciona os elementos da lista de tarefas
const toDoListItems = document.querySelectorAll('.to-do-list-items li');
const lembretesItems = document.querySelectorAll('.lembretes-quadro li');
const happyDayItems = document.querySelectorAll('.happy-day-items li');

// Função para editar um item da lista
function editarItem(item) {
    const span = item.querySelector('.list-item');
    const input = item.querySelector('.edit-input');
    
    // Verifica se o input está oculto ou não
    if (input.style.display === 'none') {
        // Mostra o input e oculta o texto
        input.value = span.textContent; // Define o valor do input
        input.style.display = 'inline-block';
        span.style.display = 'none';
        input.focus(); // Define o foco no input
    } else {
        // Oculta o input e mostra o texto
        span.textContent = input.value; // Atualiza o texto do item
        input.style.display = 'none';
        span.style.display = 'inline-block';
    }
}

// Adiciona o ouvinte de evento "click" para todos os itens da lista
toDoListItems.forEach(item => {
    item.addEventListener('click', () => editarItem(item));
});

lembretesItems.forEach(item => {
    item.addEventListener('click', () => editarItem(item));
});

happyDayItems.forEach(item => {
    item.addEventListener('click', () => editarItem(item));
});

// Código JavaScript para o timer
const timerDisplay = document.querySelector('.time');
const startButton = document.querySelector('.start');
const pauseButton = document.querySelector('.pause');
const resetButton = document.querySelector('.reset');

let timerSeconds = 1800; // Tempo inicial em segundos (30 minutos)
let timerInterval;

function updateTimer() {
  const hours = Math.floor(timerSeconds / 3600);
  const minutes = Math.floor((timerSeconds % 3600) / 60);
  const seconds = timerSeconds % 60;

  timerDisplay.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  timerSeconds--;

  if (timerSeconds < 0) {
    alert("Tempo esgotado!");
    clearInterval(timerInterval);
  }
}

startButton.addEventListener('click', () => {
  timerInterval = setInterval(updateTimer, 1000);
  startButton.style.display = "none";
  pauseButton.style.display = "inline-block";
  resetButton.disabled = false;
});

pauseButton.addEventListener('click', () => {
  clearInterval(timerInterval);
  startButton.style.display = "inline-block";
  pauseButton.style.display = "none";
  resetButton.style.display = "inline-block";
  resetButton.disabled = false;
});

resetButton.addEventListener('click', () => {
  clearInterval(timerInterval);
  timerSeconds = 1800;
  updateTimer();
  startButton.style.display = "inline-block";
  pauseButton.style.display = "none"; 
  resetButton.style.display = "none"; 
  resetButton.disabled = true;
  pauseButton.disabled = true; // Desabilita o "pause" após o reset
  
  // Habilita o "pause" novamente após o reset
  startButton.addEventListener('click', () => {
    pauseButton.disabled = false;
  });
});
