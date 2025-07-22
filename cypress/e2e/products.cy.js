import {vegaHomePage} from "../Pages/vegaHomePage";
import {vegaProductsPage} from "../Pages/vegaProductsPage";
const {elements} = vegaProductsPage

describe('Vega test', () => {
    beforeEach(() => {
       vegaHomePage.visit()
    })

    it('Verify navigation for each category in the "Տեխնիկա և էլեկտրոնիկա" section', () => {
        elements.subcategoryDropdownMenu().should('be.visible');

        cy.fixture('mainCategories.json').then((categories) => {
            categories.forEach((category) => {
                cy.contains(category.name).click()

                cy.url().should('include', category.expectedUrl)

                elements.subcategoryDropdownMenu().should('be.visible')
            });
        });
    });

    it('Verify redirection to the first product subcategory from "Տեխնիկա և էլեկտրոնիկա"', () => {
        vegaProductsPage.clickProductsFirstCategory()

        elements.subcategoryDropdownMenu().should('be.visible')

        vegaProductsPage.clickFirstSubCategoryLink()
        cy.url().should('include', '/aowdio-video-tekhnika/herhowstatsowytsner/')
    })

    it('Verify product details and pricing are correctly shown after adding to cart', () => {
        cy.openTVSubcategoryPage()

        vegaProductsPage.getProductInfo().then((product) => {
            vegaProductsPage.hoverOverFirstProduct()
            vegaProductsPage.getCartTotalCount().then(initialCount => {
                const initialCountValue = initialCount || 0

                cy.clock();
                vegaProductsPage.clickAddToCartBtn()
                vegaProductsPage.elements.addToCartPopupMessage().should('contain.text', 'Ավելացված է զամբյուղ')
                cy.tick(2000)

                cy.wait(1000);

                vegaProductsPage.getCartTotalCount().then(newCount => {
                    expect(newCount).to.eq(initialCountValue + 1)
                })
                vegaProductsPage.clickCartToggleBtn()
                elements.cartDropDownMenu().should('be.visible')

                vegaProductsPage.getProductNameInCart().then((productNameInCart) => {
                    expect(productNameInCart).to.eq(product.name)
                })

                vegaProductsPage.getCartTotalPrice().then((cartTotalPriceText) => {
                    const cleanedCartPrice = vegaProductsPage.convertPrice(cartTotalPriceText)
                    const cleanedProductPrice = vegaProductsPage.convertPrice(product.price)

                    expect(cleanedCartPrice).to.eq(cleanedProductPrice)
                });
            })
        })
    });

    it('Verify total price is sum of all products added', () => {
        let expectedTotal = 0;

        cy.addFirstProductFromTVSubcategoryToCart().then((product1) => {
            const firstProductPrice = vegaProductsPage.convertPrice(product1.price)

            vegaProductsPage.clickSecondSubCategoryLink()
            cy.url().should('include', '/aowdio-video-tekhnika/smart-box-hamakarger/')

            vegaProductsPage.hoverOverFirstProduct()
            vegaProductsPage.getProductInfo().then((product2) => {
                const secondProductPrice = vegaProductsPage.convertPrice(product2.price)

                vegaProductsPage.clickAddToCartBtn()
                vegaProductsPage.elements.addToCartPopupMessage().should('contain.text', 'Ավելացված է զամբյուղ')

                vegaProductsPage.clickCartToggleBtn()
                vegaProductsPage.elements.cartDropDownMenu().should('be.visible')

                cy.wait(1000)
                expectedTotal = firstProductPrice + secondProductPrice;

                vegaProductsPage.getCartTotalCount().then((newCount) => {
                    expect(newCount).to.eq(2)
                })

                vegaProductsPage.getProductNameInCart().then((productNameInCart) => {
                    expect(productNameInCart.trim()).to.include(product2.name.trim())
                })

                vegaProductsPage.getCartTotalPrice().then((cartTotal) => {
                    const actualCartTotal = vegaProductsPage.convertPrice(cartTotal)
                    expect(actualCartTotal).to.eq(expectedTotal)
                })
            })
        })
    })

    it('Verify redirection to checkout page after clicking "Պատվիրել" button in popup', () => {

        cy.addFirstProductFromTVSubcategoryToCart().then(() => {
            vegaProductsPage.clickOrderNowFromPopup()

            cy.url().should('include', '/checkout')
        });
    })
})

