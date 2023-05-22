describe('api gateway spec', () => {
  it('Succesful POST for PET', () => {
    cy.fixture('request-response.json').then((data) => {
      cy.request('POST', Cypress.env('apiUrl') + '/pet', data).then(
        (response) => {
          expect(response).property('status').to.equal(200);
        }
      );
    });
  });

  it('Should GET just created PET', () => {
    cy.fixture('request-response.json').then((data) => {
      cy.request({
        method: 'GET',
        url: Cypress.env('apiUrl') + '/pet/' + data['id'],
        failOnStatusCode: false,
      }).then((response) => {
        expect(response).property('status').to.equal(200);
        expect(response.body).to.deep.equal(data);
      });
    });
  });

  it('Succesful GET for PET with no deep equal', () => {
    cy.fixture('request-response.json').then((data) => {
      cy.request(Cypress.env('apiUrl') + '/pet/' + data['id']).then(
        (response) => {
          // we could also use deep equal for whole validation
          expect(response).property('status').to.equal(200);
          expect(response.body.category)
            .to.have.property('id')
            .to.be.equal(data['category']['id']);
          expect(response.body.category)
            .to.have.property('name')
            .to.equal(data['category']['name']);
          expect(response.body)
            .to.have.property('status')
            .to.equal(data['status']);

          expect(response.body.tags[0])
            .to.have.property('id')
            .to.equal(data['tags'][0]['id']);
          expect(response.body.tags[0])
            .to.have.property('name')
            .to.equal(data['tags'][0]['name']);
        }
      );
    });
  });

  it('Succesful PUT for PET-update status', () => {
    cy.fixture('request-response.json').then((data) => {
      data['status'] = 'Pending';
      cy.request('PUT', Cypress.env('apiUrl') + '/pet', data).then(
        (response) => {
          expect(response).property('status').to.equal(200);
          expect(response.body).to.have.property('status').to.equal('Pending');
        }
      );
    });
  });

  it('Succesful Delete for PET', () => {
    cy.fixture('request-response.json').then((data) => {
      cy.request('DELETE', Cypress.env('apiUrl') + '/pet/' + data['id']).then(
        (response) => {
          expect(response).property('status').to.equal(200);
        }
      );
    });
  });

  it('Should not GET deleted PET', () => {
    cy.fixture('request-response.json').then((data) => {
      cy.request({
        method: 'GET',
        url: Cypress.env('apiUrl') + '/pet/' + data['id'],
        failOnStatusCode: false,
      }).then((response) => {
        expect(response).property('status').to.equal(404);
      });
    });
  });
});
