/// <reference types="cypress" />

describe("Testes de signup", () => {
  beforeEach(() => {
    cy.visit("cadastro");
  });

  it("Clicar em item `Cadastro` na barra de navegação abre página de cadastro", () => {
    cy.visit("");
    cy.get("[data-cy='signup-link']").click();
    cy.url().should("include", "cadastro");
    cy.get("app-signup-form").should("be.visible");
  });

  it("Cadastro não pode ser efetuado com campos vazios", () => {
    cy.get("[data-cy='signup-btn']").click();
    cy.get("[data-error='cpf-missing']").should("be.visible");
    cy.get("[data-error='password-missing']").should("be.visible");
    cy.get("[data-error='username-missing']").should("be.visible");
    cy.get("[data-error='email-missing']").should("be.visible");
    cy.get("[data-error='phone-missing']").should("be.visible");
    cy.get("[data-error='function-missing']").should("be.visible");
    cy.get("[data-error='confirm_password-missing']").should("be.visible");
  });

  it("CPF não pode conter letras", () => {
    cy.get("input[name=cpf]").type("1111111111a");
    cy.get("[data-error='cpf-letters']").should("be.visible");
  });
  it("CPF deve ter 11 dígitos", () => {
    cy.get("input[name=cpf]").type("1111111111");
    cy.get("[data-cy='signup-btn']").click();
    cy.get("[data-error='cpf-length']").should("be.visible");
  });

  it("Nome não deve conter números", () => {
    cy.get("input[name=username]").type("Humbert0");
    cy.get("[data-error='name-numbers']").should("be.visible");
  });

  it("Telefone não deve ter letras", () => {
    cy.get("input[name=phone]").type("9111b1111");
    cy.get("[data-error='phone-letters']").should("be.visible");
  });

  it("Senha de confirmação deve ser igual à senha", () => {
    cy.get("input[name=password]").type("senha1234");
    cy.get("input[name=repeatPassword]").type("senha123");
    cy.get("[data-error='password-divergent']").should("be.visible");
    cy.get("input[name=repeatPassword]").type("4");
    cy.get("[data-error='password-divergent']").should("not.be.visible");
  });

  it("Cadastro com dados válidos não gera mensagem de erro", () => {
    cy.get("input[name=cpf]").type("11111111111");
    cy.get("input[name=password]").type("senha1234");
    cy.get("input[name=username]").type("joao");
    cy.get("input[name=email]").type("jaozinhoreidelas12@gmail.com");
    cy.get("input[name=phone]").type("81911223344");
    cy.get("input[name=repeatPassword]").type("senha1234");
    cy.get("select[name=funcao]").select("Advogado");

    cy.get("[data-cy='signup-link']").click();

    cy.get("[data-error='cpf-missing']").should("not.be.visible");
    cy.get("[data-error='password-missing']").should("not.be.visible");
    cy.get("[data-error='username-missing']").should("not.be.visible");
    cy.get("[data-error='email-missing']").should("not.be.visible");
    cy.get("[data-error='phone-missing']").should("not.be.visible");
    cy.get("[data-error='function-missing']").should("not.be.visible");
    cy.get("[data-error='confirm_password-missing']").should("not.be.visible");
  });
});
