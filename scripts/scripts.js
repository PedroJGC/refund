// Seleciona os elementos do formulário
const form = document.querySelector('form');
const amount = document.getElementById('amount');
const expense = document.getElementById('expense');
const category = document.getElementById('category');

// Seleciona o elemento ul
const expenseList = document.querySelector('ul');
const expensesTotal = document.querySelector('aside header h2');
const expenseQuantity = document.querySelector('aside header p span');

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

// Adiciona um evento de submit ao formulário
form.onsubmit = (event) => {
  // Previne o envio do formulário
  event.preventDefault();

  // Cria um objeto com os dados do novo gasto
  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  };

  // Chama a função para adicionar um novo item na lista de gastos
  expenseAdd(newExpense);
};

// Função para adicionar um novo item na lista de gastos
function expenseAdd(newExpense) {
  try {
    // Cria o elemento li para adicionar o item na lista (ul)
    const expenseItem = document.createElement('li');
    expenseItem.className = 'expense';

    // Cria o ícone da categoria
    const expenseIcon = document.createElement('img');
    expenseIcon.setAttribute('src', `img/${newExpense.category_id}.svg`);
    expenseIcon.setAttribute('alt', newExpense.category);

    // Cria o elemento div para adicionar as informações da despesa
    const expenseInfo = document.createElement('div');
    expenseInfo.className = 'expense-info';

    // Cria o nome da despesa
    const expenseName = document.createElement('strong');
    expenseName.textContent = newExpense.expense;

    // Cria a categoria da despesa
    const expenseCategory = document.createElement('span');
    expenseCategory.textContent = newExpense.category_name;

    // Adiciona nome e categoria na div das informações da despesa
    expenseInfo.append(expenseName, expenseCategory);

    // Cria o valor da despesa
    const expenseAmount = document.createElement('span');
    expenseAmount.className = 'expense-amount';
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace('R$', '')}`;

    // Cria o ícone de excluir
    const removeIcon = document.createElement('img');
    removeIcon.className = 'remove-icon';
    removeIcon.setAttribute('src', 'img/remove.svg');
    removeIcon.setAttribute('alt', 'Remover');

    // Adiciona as informações no item.
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon);

    // Adiciona o item na lista
    expenseList.append(expenseItem);

    // Limpa o formulário para adicionar um novo item
    formClear();

    // Atualiza o valor total das despesas
    updateTotals();
  } catch (error) {
    alert('Não foi possível atualizar a lista de gastos.');
    console.error(error);
  }
}

// Atualiza o valor total das despesas
function updateTotals() {
  try {
    // Recupera todos os itens (li) da lista (ul)
    const items = expenseList.children;

    // Atualiza a quantidade de itens na lista
    expenseQuantity.textContent = `${items.length} ${items.length > 1 ? 'despesas' : 'despesa'}`;

    // Variável para incrementar o valor total
    let total = 0;

    // Percorre todos os itens (li) da lista (ul)
    for (let item = 0; item < items.length; item++) {
      const itemAmount = items[item].querySelector('.expense-amount');

      // Remove todos os caracteres que não são números e substitui a vírgula por ponto
      let value = itemAmount.textContent.replace(/[^\d,]/g, '').replace(',', '.');

      // Converte o valor para float
      value = parseFloat(value);

      // verifica se o valor é um número válido
      if (isNaN(value)) {
        return alert('Não foi possível calcular o total. O valor informado não é válido.');
      }

      // Incrementa o valor total
      total += Number(value);
    }

    // Cria a span para adicionar o R$ formatado
    const symbolBRL = document.createElement('small');
    symbolBRL.textContent = 'R$';

    // Formata o valoor e remove o R$ que será exibido pela small com estilo customizado
    total = formatCurrencyBRL(total).toUpperCase().replace('R$', '');

    // Limpa o conteúdo do elemento
    expensesTotal.innerHTML = '';

    // Adiciona o simbolo e o valor total no elemento
    expensesTotal.append(symbolBRL, total);
  } catch (error) {
    alert('Não foi possível atualizar o valor total das despesas.');
    console.error(error);
  }
}

// Evento que captura o clique nos itens da lista
expenseList.addEventListener('click', function (event) {
  // Verifica se o elemento clicado é o ícone de remover
  if (event.target.classList.contains('remove-icon')) {
    // Obtém a li pai do elemento clicado
    const item = event.target.closest('.expense');
    item.remove();
  }

  // Atualiza os totais
  updateTotals();
});

function formClear() {
  // Limpa os inputs
  expense.value = '';
  category.value = '';
  amount.value = '';

  expense.focus();
}
