# Financial Management Project

## Descrição:

**Desafio Técnico**: Desenvolver um Dashboard de Controle Financeiro.

**Contexto**: Você foi contratado para construir um dashboard de controle financeiro que será utilizado por gerentes para monitorar receitas, despesas, e gerar relatórios mensas

## Tecnologias:

-   Base: Angular 18 com componentes Standalone e Signals
-   Gerenciamento de estado: NgRx (store, effects)
-   Design dos componentes: Angular Material
-   Teste E2E: Cypress
-   Download de arquivos: jspdf e export-to-csv
-   Gráficos: chart.js
-   Lint/Formatação de código: ESLint e Prettier

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/HtaSophia/financial-management-angular.git
```

2. Instale as dependências:

```bash
cd financial-management-angular
npm install
```

3. Execute a aplicação:

```bash
ng serve
```

Abra o navegador e acesse [http://localhost:4200/](http://localhost:4200/)

## Estrutura do projeto

```
cypress
│
├── e2e/
│   └── transaction-form.cy.ts
└── fixtures/

src/
│
├── app/
│   ├── core/
│   │   ├── auth/
│   │   │   ├── pages/
│   │   │   │   └── login/
│   │   │   ├── store
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.guard.ts
│   │   │   └── user.model.ts
│   │   ├── layout/
│   │   │   └── nav-layout
│   ├── features/
│   │   ├── dashboard/
│   │   │   ├── dashboard.types.ts
│   │   │   ├── dashboard.service.ts
│   │   │   └── dashboard.component.ts
│   │   ├── transactions/
│   │   │   ├── transactions-form/
│   │   │   ├── transaction-list/
│   │   │   │   ├── components/
│   │   │   │   │   └── transaction-table.component.ts
│   │   │   │   └── transaction-list.component.ts
│   │   │   └── shared/
│   │   │   │   └── transaction.service.ts
│   ├── shared/
│   │   ├── mocks/
│   │   ├── models/
│   │   ├── services/
│   │   ├── types/
│   │   └── utils/
│   ├── app.routes.ts   # Rotas
│   └── app.component.ts
│
└── styles.scss
```

## Funcionalidades

### Autenticação e Autorização

-   Usuário pode realizar a autenticação na página de login
    -   Atualmente, a autenticação é fictícia
-   Após realizar a autenticação, o usuário será direcionado para a página do dashboard

### Dashboard

-   Contém o total de receitas e despesas
-   Gráfico com as transações do mês atual
-   Opções de download das transações em formato de CSV e PDF

### transações

-   Listagem de Transações ordenada pela data mais recente
    -   Ordenação por data, tipo e valor
    -   Paginação
-   Criação de uma nova Transação

## Teste

### Unitários, Componenetes, Serviços, ...

Cada componente, serviço, guard, entre outros, que é gerado com o Angular CLI é criado juntamento com um arquivo de teste. Esses testes ainda serão desenvolvidos.

### E2E

Para executar os testes E2E com Cypress:

```bash
npm run cy:open
```
