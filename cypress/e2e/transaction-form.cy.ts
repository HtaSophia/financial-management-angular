describe('Transaction Form', () => {
    before(() => {
        cy.login('aghata@example.com', 'password1234');
    });

    beforeEach(() => {
        cy.visit('/transactions/form');
    });

    it('should have a title', () => {
        cy.title().should('eq', 'Transaction Form');
    });

    it('should have a form', () => {
        cy.get('form').should('exist');
    });

    it('should create a transaction', () => {
        cy.get('[formcontrolname="description"]').type('Test Transaction');
        cy.get('[formcontrolname="amount"]').type('1000');

        cy.get('[formcontrolname="type"]').click();
        cy.get('[value="income"]').click();

        cy.get('[formcontrolname="date"]').type('10/02/2024');
        cy.get('[formcontrolname="categories"]').next().type('category1').type('{enter}');
        cy.get('button[type="submit"]').click();
        cy.url().should('eq', 'http://localhost:4200/transactions');
        cy.get('tbody').children().contains('Test Transaction');
    });
});
