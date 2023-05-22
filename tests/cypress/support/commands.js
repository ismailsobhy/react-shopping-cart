// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add(
  'validateTotalPrice',
  { prevSubject: true },
  (subject, totalPriceLoator, countList) => {
    let index = -1;
    let totalPrice = 0;
    cy.wrap(subject)
      .invoke('text')
      .then((text) => {
        const prices = text.replaceAll('$', '').split(/\s+/g);
        prices.forEach((price) => {
          if (price.length != 0) {
            index = index + 1;
            totalPrice = totalPrice + parseFloat(price) * countList[index];
          }
        });
      })
      .then(() => {
        cy.get(totalPriceLoator).then((element) => {
          const actualText = element
            .text()
            .replaceAll('$', '')
            .replaceAll(/\s+/g, '');
          expect(actualText).to.equal(totalPrice.toFixed(2));
          cy.checkAlertText('Checkout - Subtotal: $ ' + actualText);
        });
      });
  }
);

Cypress.Commands.add('checkAlertText', (expectedMessage) => {
  cy.on('window:alert', (message) => {
    expect(message).to.include(expectedMessage);
  });
});
Cypress.Commands.add('clickOnItems', () => {
  cy.get("button[class*='BuyButton']").first().click();
  cy.get("button[class*='BuyButton']").first().click();

  cy.get("button[class*='BuyButton']").eq(1).click();
  cy.get("button[class*='BuyButton']").eq(1).click();
  cy.get("button[class*='BuyButton']").eq(1).click();

  cy.get("button[class*='BuyButton']").eq(4).click();
  cy.get("button[class*='BuyButton']").eq(4).click();
});
