const form = document.getElementById('form-imc');
const nomeInput = document.getElementById('nome');
const idadeInput = document.getElementById('idade');
const alturaInput = document.getElementById('altura');
const pesoInput = document.getElementById('peso');
const resultadoDiv = document.getElementById('resultado');
const resultadoIMC = document.getElementById('resultado-imc');

// Dados predefinidos para o gráfico
const idades = [10, 20, 30, 40, 50, 60];
const pesosIdeais = [30, 50, 68, 72, 74, 70];

// Configuração do gráfico com Chart.js
const ctx = document.getElementById('chart-peso-ideal').getContext('2d');
let pesoIdealChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: idades,
        datasets: [{
            label: 'Peso Ideal (kg)',
            data: pesosIdeais,
            borderColor: '#4caf50',
            backgroundColor: 'rgba(76, 175, 80, 0.2)',
            borderWidth: 2,
            tension: 0.3
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Idade (anos)',
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Peso Ideal (kg)',
                }
            }
        }
    }
});

// Atualiza o gráfico dinamicamente com base na altura do usuário
function atualizarGrafico(altura) {
    const novosPesos = idades.map(() => altura * altura * 22); // Peso ideal aproximado
    pesoIdealChart.data.datasets[0].data = novosPesos;
    pesoIdealChart.update();
}

// Manipula o envio do formulário
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const nome = nomeInput.value;
    const idade = parseInt(idadeInput.value);
    const altura = parseFloat(alturaInput.value);
    const peso = parseFloat(pesoInput.value);

    if (nome && idade > 0 && altura > 0 && peso > 0) {
        const imc = (peso / (altura * altura)).toFixed(2);
        resultadoIMC.innerHTML = `${nome}, seu IMC é <strong>${imc}</strong>`;
        resultadoDiv.style.display = 'block';
        atualizarGrafico(altura);
    } else {
        alert('Por favor, preencha os campos corretamente.');
    }
});
