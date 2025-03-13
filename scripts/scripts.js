// Seleciona os elementos do formulário
const amount = document.getElementById('amount');

// Adiciona um evento de input ao campo de valor
amount.oninput = () => {
  // Remove todos os caracteres que não são números
  let value = amount.value.replace(/\D/g, '');

  // Transforma o valor em centavos (exemplo: 150/100 = 1.50)
  value = Number(value) / 100;

  // Formata o valor
  amount.value = formatCurrencyBRL(value);
};

function formatCurrencyBRL(value) {
  // Formata o valor para o formato de moeda brasileira
  value = value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  // Retorna o valor formatado
  return value;
}
