class VegaHomePage {
    visit() {
        cy.visit(Cypress.config('baseUrl'))
    }
}
export const vegaHomePage = new VegaHomePage();
