/* eslint-disable no-undef */
describe('SignUp', () => {
  it('Should create new account successfully', () => {
    cy.visit('http://localhost:3000/sign-up');
    cy.get('input[placeholder=Nome]').type('Test Cypress Test');
    cy.get('input[placeholder=E-mail]').type('meuteste@teste.com');
    cy.get('input[placeholder=Senha]').type('minhaSenhaSecreta123');
    cy.get("input[placeholder='Confirme a senha']").type(
      'minhaSenhaSecreta123'
    );
    cy.get('button[type=submit]').click();
    cy.wait(6000);
    cy.url().should('equal', 'http://localhost:3000/login');
  });
});

describe('Login', () => {
  it('Should correctly log into the app', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[placeholder=E-mail]').type('meuteste@teste.com');
    cy.get('input[placeholder=Senha]').type('minhaSenhaSecreta123');
    cy.get('button[type=submit]').click();
    cy.wait(6000);
    cy.url().should('equal', 'http://localhost:3000/plans');
  });
});
