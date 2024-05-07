
/// <reference types="cypress" />

import { getFakeLoginResponse, getRandomUser } from "../../generators/userGenerator"

describe('login tests in isolation', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
    })

    it('should successfully register', () => {
        const fakeLoginResponse = getFakeLoginResponse()
        cy.intercept('POST', '**/users/signup', (req) => {
            req.reply({
              statusCode: 201,
              body: {
                token: fakeLoginResponse.token
              }
            })
          })

        cy.get('.btn-link').click()
        cy.get('[name=firstName]').type(fakeLoginResponse.firstName)
        cy.get('[name=lastName]').type(fakeLoginResponse.lastName)
        cy.get('[name=username]').type(fakeLoginResponse.username)
        cy.get('[name=password]').type('haslomaslo123')
        cy.get('[name=email]').type(fakeLoginResponse.email)
        cy.get('.btn-primary').click()

        cy.get('.alert-success').should('contain.text', 'Registration successful')
    })

})
