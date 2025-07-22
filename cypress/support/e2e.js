Cypress.on('uncaught:exception', (err) => {
    if (err.message.includes('Shop is not defined')) {
        return false
    }
});

import 'cypress-real-events/support'
import './commands'
