# Projeto de Controle de Despesas

Este projeto foi desenvolvido durante o curso Fullstack da Rocketseat. Ele consiste em uma aplicação web para controle de despesas, onde é possível adicionar, listar e remover despesas, além de calcular o valor total das despesas.

## Funcionalidades

- Adicionar novas despesas com nome, valor e categoria.
- Listar todas as despesas adicionadas.
- Remover despesas da lista.
- Calcular e exibir o valor total das despesas.
- Formatar valores monetários para o formato brasileiro (R$).

## Tecnologias Utilizadas

- HTML
- CSS
- JavaScript

## Conceitos Aplicados

### Manipulação do DOM

A aplicação faz uso extensivo da manipulação do DOM para adicionar, remover e atualizar elementos na página. Isso inclui a criação de novos elementos, a adição de classes e atributos, e a atualização do conteúdo de elementos existentes.

### Eventos

Foram utilizados diversos eventos para interagir com o usuário, incluindo:

- `oninput`: para formatar o valor digitado no campo de valor.
- `onsubmit`: para capturar o envio do formulário e adicionar uma nova despesa.
- `click`: para capturar cliques nos ícones de remoção de despesas.

### Formatação de Moeda

A função `formatCurrencyBRL` é utilizada para formatar valores monetários para o formato brasileiro (R$). Ela utiliza o método `toLocaleString` para realizar a formatação.

### Tratamento de Erros

A aplicação inclui tratamento de erros para garantir que operações críticas, como a atualização da lista de despesas e o cálculo do valor total, sejam realizadas de forma segura. Em caso de erro, uma mensagem de alerta é exibida ao usuário e o erro é registrado no console.

### Estrutura do Código

O código está organizado de forma a separar as diferentes responsabilidades em funções distintas, facilitando a manutenção e a compreensão do código.

## Como Executar o Projeto

1. Clone o repositório para o seu ambiente local.
2. Abra o arquivo `index.html` em um navegador web.

## Estrutura do Projeto

```plaintext
.
├── [index.html](http://_vscodecontentref_/0)
├── styles
│   └── styles.css
└── scripts
    └── [scripts.js](http://_vscodecontentref_/1)


```
