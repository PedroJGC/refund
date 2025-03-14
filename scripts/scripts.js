// Seleciona os elementos do formulário
const form = document.querySelector('form');
const amount = document.getElementById('amount');
const expense = document.getElementById('expense');
const category = document.getElementById('category');

// Seleciona o elemento ul
const expenseList = document.querySelector('ul');

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
  } catch (error) {
    alert('Não foi possível atualizar a lista de gastos.');
    console.error(error);
  }
}
