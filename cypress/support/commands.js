import { vegaProductsPage } from "../Pages/vegaProductsPage"

Cypress.Commands.add('openTVSubcategoryPage', () => {
    cy.visit('/aowdio-video-tekhnika/herhowstatsowytsner/')
})

Cypress.Commands.add('addFirstProductFromTVSubcategoryToCart', () => {
    vegaProductsPage.clickProductsFirstCategory()
    vegaProductsPage.clickFirstSubCategoryLink()

    return vegaProductsPage.getProductInfo().then((product) => {
        cy.clock()
        vegaProductsPage.clickAddToCartBtn()
        vegaProductsPage.elements.addToCartPopupMessage().should('contain.text', 'Ավելացված է զամբյուղ')

        cy.wait(1000);
        cy.tick(2000)

        return cy.wrap(product)
    });
});
