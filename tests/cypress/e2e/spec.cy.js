describe('Store tests', () => {
  let locators;
  before(() => {
    cy.fixture('locators').then(function (locatorsData) {
      locators = locatorsData;
    });
  });
  beforeEach(() => {
    cy.visit('/');
  });

  it('User has nothing in shopping cart', () => {
    cy.get(locators['cart']).click();
    cy.get(locators['totalPrice']).should('have.text', '$ 0.00');
    cy.get(locators['cartProductsPanel']).should(
      'have.text',
      'Add some products in the cart :)'
    );
    cy.get(locators['cartQuantity']).should('have.text', '0');
    cy.get(locators['CheckoutButton']).click();

    cy.checkAlertText('Add some product in the cart!');
    cy.get(locators['closeCart']).click();
  });

  it('Total number of items before filter and after is the same', () => {
    cy.get(locators['buyButton'])
      .its('length')
      .then((count) => {
        cy.get('span.checkmark').click({ multiple: true });

        cy.get("main[class*='MainHeader']").then((elem) => {
          const string = elem.text();
          expect(string.replace(/\D/g, '')).to.eq('' + count);
        });
      });
  });

  it('User add only 1 item to cart', () => {
    let countList = [];
    cy.get(locators['buyButton']).first().click();
    countList[0] = 1;
    cy.get(locators['CheckoutButton']).click();

    cy.get(locators['cartQuantity']).should('have.text', '1');
    cy.get(locators['itemPrice']).validateTotalPrice(
      locators['totalPriceLocator'],
      countList
    );
  });

  it('User add multiple items to cart expected total price', () => {
    let countList = [];
    countList[0] = 2;
    countList[1] = 3;
    countList[2] = 2;

    cy.clickOnItems();

    cy.get(locators['CheckoutButton']).click();

    cy.get(locators['cartQuantity']).should('have.text', '7');
    cy.get(locators['itemPrice']).validateTotalPrice(
      locators['totalPriceLocator'],
      countList
    );
  });

  it('User add multiple items and then deletes from cart', () => {
    let countList = [];
    countList[0] = 2;
    countList[1] = 2;

    cy.clickOnItems();
    cy.get(locators['CheckoutButton']).click();
    cy.get(locators['deleteButtonFromCart']).eq(1).click();
    cy.get(locators['deleteButtonFromCart']).should('have.length', 2);
    cy.get(locators['cartQuantity']).should('have.text', '4');
    cy.get(locators['itemPrice']).validateTotalPrice(
      locators['totalPriceLocator'],
      countList
    );
  });

  it('User add/removes from cart using + and -', () => {
    let countList = [];
    countList[0] = 1;
    countList[1] = 4;
    countList[2] = 2;

    cy.clickOnItems();
    cy.get(locators['cartChangeQuantity']).eq(0).click();
    cy.get(locators['cartChangeQuantity']).eq(0).should('be.disabled');
    cy.get(locators['cartChangeQuantity']).eq(3).click();

    cy.get(locators['CheckoutButton']).click();

    cy.get(locators['cartQuantity']).should('have.text', '7');
    cy.get(locators['itemPrice']).validateTotalPrice(
      locators['totalPriceLocator'],
      countList
    );
  });
});
