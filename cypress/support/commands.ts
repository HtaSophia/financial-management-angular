/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
        login(email: string, password: string): Cypress.Chainable<void>;
    }
}

Cypress.Commands.add('login', (email, password) => {
    cy.visit('/login');
    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.get('button[type="submit"]').click();
});
