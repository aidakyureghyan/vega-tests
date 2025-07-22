import { vegaShopLocators } from './vegaShopLocators';

class VegaProductsPage {
    elements = {
        productsFirstCategory: () => {
            return cy.get(vegaShopLocators.productsFirstCategory)
        },
        subcategoryDropdownMenu: () => {
            return cy.get(vegaShopLocators.subcategoryDropdownMenu).first().click({force: true})
        },
        firstSubCategoryLink: () => {
            return cy.get(vegaShopLocators.firstSubCategoryLink)
        },
        secondSubCategoryLink: () => {
            return cy.get(vegaShopLocators.secondSubCategoryLink)
        },
        productName: () => {
            return cy.get(vegaShopLocators.productName).first()
        },
        productPrice: () => {
            return cy.get(vegaShopLocators.productPrice).first()
        },
        addToCartBtn: () => {
            return cy.get(vegaShopLocators.addToCartBtn)
        },
        Product: () => {
            return cy.get(vegaShopLocators.Product)
        },
        addToCartPopupMessage: () => {
            return cy.get(vegaShopLocators.addToCartPopupMessage)
        },
        cartProductsTotalCount: () => {
            return cy.get(vegaShopLocators.cartProductsTotalCount)
        },
        cartToggleBtn: () => {
            return cy.get(vegaShopLocators.cartToggleBtn)
        },
        cartDropDownMenu: () => {
            return cy.get(vegaShopLocators.cartDropDownMenu)
        },
        productNameInCart: () => {
            return cy.get(vegaShopLocators.productNameInCart)
        },
        cartTotalPrice: () => {
            return cy.get(vegaShopLocators.cartTotalPrice)
        },
        checkoutBtn: () => {return cy.get(vegaShopLocators.checkoutBtn)}
    }

    // actions
    clickProductsFirstCategory = () => {
        this.elements.productsFirstCategory()
            .realHover()
    }

    clickFirstSubCategoryLink = () => {
        this.elements.firstSubCategoryLink().click({force: true})
    }

    hoverOverFirstProduct = () => {
        return this.elements.Product()
            .first()
            .realHover()
    }

    clickAddToCartBtn = () => {
        return this.elements.addToCartBtn().first().click({force: true})
    }

    getCartTotalCount = () => {
        return this.elements.cartProductsTotalCount()
            .first()
            .invoke('text')
            .then((text) => parseInt(text.trim()) || 0)
    }

    clickCartToggleBtn = () => {
        return this.elements.cartToggleBtn().click({force: true})

    }

    getProductInfo = () => {
        return cy.wrap({}).then((product) => {
            return this.elements.productName()
                .invoke('text')
                .then((name) => {
                    product.name = name.trim()

                    return this.elements.productPrice()
                        .invoke('text')
                        .then((price) => {
                            product.price = price.trim();
                            return product;
                        })
                })
        })
    }
    getProductNameInCart = () => {
        return this.elements.productNameInCart()
            .invoke('text')
            .then((productName) => {
                return productName.trim()
            });
    }

    getCartTotalPrice = () => {
        return this.elements.cartTotalPrice()
            .invoke('text')
            .then((cartTotalPriceText) => {
                return parseInt(cartTotalPriceText.replace(/[^\d]/g, ''), 10)
            })
    }
    clickSecondSubCategoryLink = () => {
        this.elements.secondSubCategoryLink().click({force: true})
    }

    convertPrice(priceStr) {
        if (!priceStr) return 0
        return parseInt(String(priceStr).replace(/[^\d]/g, ''), 10)
    }

    clickOrderNowFromPopup = () => {
        return this.elements.checkoutBtn().first()
            .click({ force: true })
    }
}
export const vegaProductsPage = new VegaProductsPage();



