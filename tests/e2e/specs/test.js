// https://docs.cypress.io/api/introduction/api.html

describe('Load the app', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
  })
  it('Contains New Record button', () => {
    cy.contains('New Record')
  })
  it('When clicking New Record Opens a modal for adding a new record ', () => {
    cy.contains('New Record').click()
    cy.get('.p-dialog-mask')
  })
  it('Adds a new record and can be filtered', () => {
    cy.get('#firstName').type('whololo')
    cy.get('#lastName').type('Sandiax')
    cy.get('#phone').type('123 123 123')
    cy.get('#email').type('whololo@gmail.com')
    cy.contains('Submit').click()
    cy.get('#keywordSearch').type('whololo@gmail')
    cy.get('td:first').contains('whololo')
  })
  
})
